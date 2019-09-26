import { api } from '~/services/api'

export const getAddressByCEP = async (cep) => {
  const { data } = await api.get(`zipcode/${cep}`)

  return {
    cep,
    neighborhood: data.district,
    city: data.city,
    street: data.street_short,
    state: data.uf
  }
}
