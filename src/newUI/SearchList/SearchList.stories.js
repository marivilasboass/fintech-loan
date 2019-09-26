import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { View } from '~/newUI'
import SelectableListItem from '~/newUI/SelectableListItem'

import SearchList from './SearchList'

const list = [
  {
    value: 'Advogado Administrativo',
    synonyms: [
      'Advogado Administrativo',
      'Advogada Administrativo'
    ]
  },
  {
    value: 'Advogado Eleitoral',
    synonyms: [
      'Advogado Eleitoral',
      'Advogada Eleitoral'
    ]
  },
  {
    value: 'Especialista Financeiro',
    synonyms: [
      'Especialista Financeiro',
      'Especialista Financeiro'
    ]
  },
  {
    value: 'Analista de Sistemas',
    synonyms: [
      'Analista de Sistemas',
      'Analista de Sistemas'
    ]
  },
  {
    value: 'Analista de Inteligência Comercial',
    synonyms: [
      'Analista de Inteligência Comercial',
      'Analista de Inteligência Comercial'
    ]
  },
  {
    value: 'Analista de Web Design',
    synonyms: [
      'Analista de Web Design',
      'Analista de Web Design'
    ]
  },
  {
    value: 'Analista de Outsourcing',
    synonyms: [
      'Analista de Outsourcing',
      'Analista de Outsourcing'
    ]
  },
  {
    value: 'Analista Pedagógico',
    synonyms: [
      'Analista Pedagógico',
      'Analista Pedagógico'
    ]
  },
  {
    value: 'Analista Programador .NET',
    synonyms: [
      'Analista Programador .NET',
      'Analista Programadora .NET'
    ]
  },
  {
    value: 'Arquiteto de Edificações',
    synonyms: [
      'Arquiteto de Edificações',
      'Arquiteta de Edificações'
    ]
  },
  {
    value: 'Apontador de Obras',
    synonyms: [
      'Apontador de Obras',
      'Apontadora de Obras'
    ]
  },
  {
    value: 'Analista Programador WebSphere',
    synonyms: [
      'Analista Programador WebSphere',
      'Analista Programadora WebSphere'
    ]
  },
  {
    value: 'Analista de Assuntos Regulatórios',
    synonyms: [
      'Analista de Assuntos Regulatórios',
      'Analista de Assuntos Regulatórios'
    ]
  },
  {
    value: 'Assistente Comercial',
    synonyms: [
      'Assistente Comercial',
      'Assistente Comercial'
    ]
  },
  {
    value: 'Analista de Relacionamento',
    synonyms: [
      'Analista de Relacionamento',
      'Analista de Relacionamento'
    ]
  },
  {
    value: 'Analista Programador SharePoint',
    synonyms: [
      'Analista Programador SharePoint',
      'Analista Programadora SharePoint'
    ]
  },
  {
    value: 'Analista Programador SQL',
    synonyms: [
      'Analista Programador SQL',
      'Analista Programadora SQL'
    ]
  },
  {
    value: 'Analista Programador PL SQL',
    synonyms: [
      'Analista Programador PL SQL',
      'Analista Programadora PL SQL'
    ]
  },
  {
    value: 'Analista de Recursos Humanos',
    synonyms: [
      'Analista de Recursos Humanos',
      'Analista de Recursos Humanos'
    ]
  },
  {
    value: 'Arquivista',
    synonyms: [
      'Arquivista',
      'Arquivista'
    ]
  },
  {
    value: 'Analista de Recrutamento e Seleção',
    synonyms: [
      'Analista de Recrutamento e Seleção',
      'Analista de Recrutamento e Seleção'
    ]
  },
  {
    value: 'Aprendiz na área Mecânica',
    synonyms: [
      'Aprendiz na área Mecânica',
      'Aprendiz na área Mecânica'
    ]
  },
  {
    value: 'Analista de Banco de Dados',
    synonyms: [
      'Analista de Banco de Dados',
      'Analista de Banco de Dados'
    ]
  },
  {
    value: 'Analista de Mídia',
    synonyms: [
      'Analista de Mídia',
      'Analista de Mídia'
    ]
  },
  {
    value: 'Analista de Sistemas Mainframe',
    synonyms: [
      'Analista de Sistemas Mainframe',
      'Analista de Sistemas Mainframe'
    ]
  },
  {
    value: 'Agente de Serviços',
    synonyms: [
      'Agente de Serviços',
      'Agente de Serviços'
    ]
  },
  {
    value: 'Analista Fiscal',
    synonyms: [
      'Analista Fiscal',
      'Analista Fiscal'
    ]
  },
  {
    value: 'Advogado Tributarista',
    synonyms: [
      'Advogado Tributarista',
      'Advogada Tributarista'
    ]
  },
  {
    value: 'Analista de Marketing Digital',
    synonyms: [
      'Analista de Marketing Digital',
      'Analista de Marketing Digital'
    ]
  },
  {
    value: 'Assistente de Contas a Pagar e Receber',
    synonyms: [
      'Assistente de Contas a Pagar e Receber',
      'Assistente de Contas a Pagar e Receber'
    ]
  },
  {
    value: 'Analista de Frota',
    synonyms: [
      'Analista de Frota',
      'Analista de Frota'
    ]
  },
  {
    value: 'Analista de Franquias',
    synonyms: [
      'Analista de Franquias',
      'Analista de Franquias'
    ]
  },
  {
    value: 'Analista de Sistemas PHP',
    synonyms: [
      'Analista de Sistemas PHP',
      'Analista de Sistemas PHP'
    ]
  },
  {
    value: 'Advogado Securitário',
    synonyms: [
      'Advogado Securitário',
      'Advogada Securitário'
    ]
  },
  {
    value: 'Analista de Manutenção',
    synonyms: [
      'Analista de Manutenção',
      'Analista de Manutenção'
    ]
  },
  {
    value: 'Analista Administrativo',
    synonyms: [
      'Analista Administrativo',
      'Analista Administrativo'
    ]
  },
  {
    value: 'Analista de Cobrança',
    synonyms: [
      'Analista de Cobrança',
      'Analista de Cobrança'
    ]
  },
  {
    value: 'Analista de Legalização',
    synonyms: [
      'Analista de Legalização',
      'Analista de Legalização'
    ]
  },
  {
    value: 'Analista de Sistemas ERP',
    synonyms: [
      'Analista de Sistemas ERP',
      'Analista de Sistemas ERP'
    ]
  },
  {
    value: 'Analista Programador Mainframe',
    synonyms: [
      'Analista Programador Mainframe',
      'Analista Programadora Mainframe'
    ]
  },
  {
    value: 'Analista de Suporte Técnico',
    synonyms: [
      'Analista de Suporte Técnico',
      'Analista de Suporte Técnico'
    ]
  },
  {
    value: 'Analista de Telecomunicações',
    synonyms: [
      'Analista de Telecomunicações',
      'Analista de Telecomunicações'
    ]
  },
  {
    value: 'Analista de Fusões e Aquisições',
    synonyms: [
      'Analista de Fusões e Aquisições',
      'Analista de Fusões e Aquisições'
    ]
  },
  {
    value: 'Analista Programador C#',
    synonyms: [
      'Analista Programador C#',
      'Analista Programadora C#'
    ]
  },
  {
    value: 'Arquiteto Urbanista',
    synonyms: [
      'Arquiteto Urbanista',
      'Arquiteta Urbanista'
    ]
  },
  {
    value: 'Analista de Suprimentos',
    synonyms: [
      'Analista de Suprimentos',
      'Analista de Suprimentos'
    ]
  },
  {
    value: 'Analista de Estoque',
    synonyms: [
      'Analista de Estoque',
      'Analista de Estoque'
    ]
  }
]

storiesOf('SearchList', module)
  .addDecorator(getStory => <View paddedHorizontally>{getStory()}</View>)
  .add('basic', () => (
    <SearchList
      inputProps={{ placeholder: 'buscar' }}
      list={list}
      listKey='value'
      filterableKeys={['value', 'synonyms']}
      ListItemComponent={SelectableListItem}
    />
  ))
  .add('list title', () => (
    <SearchList
      listTitle='Titulo da lista'
      inputProps={{ placeholder: 'buscar' }}
      list={list}
      listKey='value'
      filterableKeys={['value', 'synonyms']}
      ListItemComponent={SelectableListItem}
    />
  ))
