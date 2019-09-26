import React from 'react'
import Text from '../Text'

class Typography extends Text {}

Typography.T1 = (props) => <Text fontSize={16} variant='bold' {...props} />
Typography.T2 = (props) => <Text fontSize={16} {...props} />
Typography.T3 = (props) => <Text fontSize={14} variant='semibold' {...props} />
Typography.T4 = (props) => <Text fontSize={14} {...props} />
Typography.T5 = (props) => <Text fontSize={13} {...props} />
Typography.T6 = (props) => <Text fontSize={12} {...props} />

Typography.H1 = (props) => <Text fontSize={32} variant='heavy' {...props} />
Typography.H2 = (props) => <Text fontSize={28} variant='bold' {...props} />
Typography.H3 = (props) => <Text fontSize={24} variant='heavy' {...props} />
Typography.H4 = (props) => <Text fontSize={20} variant='heavy' {...props} />
Typography.H5 = (props) => <Text fontSize={20} variant='bold' {...props} />
Typography.H6 = (props) => <Text fontSize={18} variant='bold' {...props} />

export default Typography
