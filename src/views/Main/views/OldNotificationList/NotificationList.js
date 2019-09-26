import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import R from 'ramda'

import { NoResultsView, Loader, RefreshControl } from '~/UI'
import Skeleton from '~/components/Skeleton'
import resolveLink from '~/services/resolveLink'
import withNeighborhoodSimilarity from '~/utils/withNeighborhoodSimilarity'
import NotificationItem from './components/NotificationItem'

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 20
  }
})

const sortByCreatedAt = R.sort(R.comparator((a, b) => a.createdAt > b.createdAt))
const withNeighboringCategories = withNeighborhoodSimilarity((notice, noticeNeighbor) =>
  noticeNeighbor.category === notice.category && noticeNeighbor.highlightColor === notice.highlightColor
)

export default class NotificationList extends React.PureComponent {
  componentDidMount () {
    const { fetchNotices, fetchNoticesCount } = this.props
    fetchNoticesCount()
    fetchNotices(true)
  }

  onPressNotice = (_id) => {
    const { navigation, notices, registerView } = this.props

    const notice = notices.filter(n => n._id === _id)[0]
    const { link } = notice

    registerView(_id)

    if (link) {
      resolveLink(navigation, link)
    }
  }

  onEndReached = () => {
    const { endReached, fetchNotices } = this.props
    !endReached && fetchNotices()
  }

  renderItem = ({ item }) => {
    return (
      <NotificationItem
        onPress={() => this.onPressNotice(item._id)}
        navigation={this.props.navigation}
        key={item._id}
        {...item}
      />
    )
  }

  render () {
    const { loading, notices, fetchNotices, resetting } = this.props

    const sortedNotices = sortByCreatedAt(notices)
    const noticesWithNeighboringCategories = sortedNotices.map(withNeighboringCategories)
    const emptyComponent = loading
      ? null
      : <NoResultsView>Você não possui nenhuma notificação</NoResultsView>

    return (
      <Skeleton banner='Notificações' navigation={this.props.navigation}>
        <FlatList
          data={noticesWithNeighboringCategories}
          renderItem={this.renderItem}
          keyExtractor={notice => notice._id}
          ListEmptyComponent={emptyComponent}
          refreshControl={(
            <RefreshControl
              refreshing={resetting}
              onRefresh={() => fetchNotices(true)}
            />
          )}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={!resetting && loading && <Loader.Footer style={styles.footer} />}
        />
      </Skeleton>
    )
  }
}
