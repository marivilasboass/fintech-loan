import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from '~/newUI'
import { Approved, Rejected, Pending } from './Icon'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    marginTop: 16
  }
})

const statusInformationMap = {
  approved: {
    icon: <Approved />,
    title: 'Seus documentos foram enviados',
    description: 'Confirme para enviar à análise'
  },
  analysis: {
    icon: <Approved />,
    title: 'Seus documentos foram enviados',
    description: 'Confirme para enviar à análise'
  },
  loading: {
    icon: <Approved />,
    title: 'Seus documentos foram enviados',
    description: 'Confirme para enviar à análise'
  },
  pending: {
    icon: <Pending />,
    title: 'Quase lá!',
    description: 'Complete seu cadastro'
  },
  rejected: {
    icon: <Rejected />,
    title: 'Oops... algo deu errado',
    description: 'Verifique seus envios e tente novamente'
  }
}

const getStatusInformation = (status, userType) => {
  const { description, ...rest } = statusInformationMap[status] || statusInformationMap.pending
  if (typeof description === 'string') {
    return { description, ...rest }
  }

  return { description: description[userType], ...rest }
}

export default class StatusHeader extends React.PureComponent {
  render () {
    const { status, userType } = this.props
    const { icon, title, description } = getStatusInformation(status, userType)
    return (
      <View style={styles.container}>
        {icon}
        <Text variant='bold' color='white' style={styles.title}>{title}</Text>
        <Text color='white'>{description}</Text>
      </View>
    )
  }
}
