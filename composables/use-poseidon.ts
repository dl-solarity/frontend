/* eslint-disable @typescript-eslint/ban-ts-comment */
// ffjavascript has no types in npm registry!
// @ts-nocheck

import { getCurveFromName } from 'ffjavascript'

import poseidonConstants from '@/constants/poseidon_constants_opt'
import assert from 'assert'
import { Poseidon, BigNumberish } from 'circomlibjs'

function unsringifyConstants(Fr, o) {
  if (typeof o == 'string' && /^[0-9]+$/.test(o)) {
    return Fr.e(o)
  } else if (typeof o == 'string' && /^0x[0-9a-fA-F]+$/.test(o)) {
    return Fr.e(o)
  } else if (Array.isArray(o)) {
    return o.map(unsringifyConstants.bind(null, Fr))
  } else if (typeof o == 'object') {
    if (o === null) return null
    const res = {}
    const keys = Object.keys(o)
    keys.forEach(k => {
      res[k] = unsringifyConstants(Fr, o[k])
    })
    return res
  } else {
    return o
  }
}

export async function usePoseidon(): Promise<Poseidon> {
  const bn128 = await getCurveFromName('bn128', true)

  const F = bn128.Fr

  const opt = unsringifyConstants(F, poseidonConstants)

  const N_ROUNDS_F = 8
  const N_ROUNDS_P = [
    56, 57, 56, 60, 60, 63, 64, 63, 60, 66, 60, 65, 70, 60, 64, 68,
  ]

  const pow5 = a => F.mul(a, F.square(F.square(a, a)))

  function poseidon(
    inputs: BigNumberish[],
    initState: BigNumberish,
    nOut: number,
  ): Poseidon {
    assert(inputs.length > 0)
    assert(inputs.length <= N_ROUNDS_P.length)

    if (initState) {
      initState = F.e(initState)
    } else {
      initState = F.zero
    }
    nOut = nOut || 1

    const t = inputs.length + 1
    const nRoundsF = N_ROUNDS_F
    const nRoundsP = N_ROUNDS_P[t - 2]
    const C = opt.C[t - 2]
    const S = opt.S[t - 2]
    const M = opt.M[t - 2]
    const P = opt.P[t - 2]

    let state = [initState, ...inputs.map(a => F.e(a))]

    state = state.map((a, i) => F.add(a, C[i]))

    for (let r = 0; r < nRoundsF / 2 - 1; r++) {
      state = state.map(a => pow5(a))
      state = state.map((a, i) => F.add(a, C[(r + 1) * t + i]))
      state = state.map((_, i) =>
        state.reduce((acc, a, j) => F.add(acc, F.mul(M[j][i], a)), F.zero),
      )
    }
    state = state.map(a => pow5(a))
    state = state.map((a, i) => F.add(a, C[(nRoundsF / 2 - 1 + 1) * t + i]))
    state = state.map((_, i) =>
      state.reduce((acc, a, j) => F.add(acc, F.mul(P[j][i], a)), F.zero),
    )
    for (let r = 0; r < nRoundsP; r++) {
      state[0] = pow5(state[0])
      state[0] = F.add(state[0], C[(nRoundsF / 2 + 1) * t + r])

      const s0 = state.reduce((acc, a, j) => {
        return F.add(acc, F.mul(S[(t * 2 - 1) * r + j], a))
      }, F.zero)
      for (let k = 1; k < t; k++) {
        state[k] = F.add(
          state[k],
          F.mul(state[0], S[(t * 2 - 1) * r + t + k - 1]),
        )
      }
      state[0] = s0
    }
    for (let r = 0; r < nRoundsF / 2 - 1; r++) {
      state = state.map(a => pow5(a))
      state = state.map((a, i) =>
        F.add(a, C[(nRoundsF / 2 + 1) * t + nRoundsP + r * t + i]),
      )
      state = state.map((_, i) =>
        state.reduce((acc, a, j) => F.add(acc, F.mul(M[j][i], a)), F.zero),
      )
    }
    state = state.map(a => pow5(a))
    state = state.map((_, i) =>
      state.reduce((acc, a, j) => F.add(acc, F.mul(M[j][i], a)), F.zero),
    )

    if (nOut == 1) {
      return state[0]
    } else {
      return state.slice(0, nOut)
    }
  }

  poseidon.F = F
  return poseidon
}
