import React, {Component} from 'react';
import {
  ListView,
  RefreshControl
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

class ListViewFull extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.itens)
    });
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.itens)
    });
  }

  render() {
    const {refreshing, onRefresh, onLoadMoreAsync, canLoadMoreContent} = this.props;
    let scrollComponent;
    if (onLoadMoreAsync) {
      scrollComponent= props => (
        <InfiniteScrollView
          onLoadMoreAsync={onLoadMoreAsync}
          canLoadMoreContent={canLoadMoreContent}/>
      );
    }
    return (
      <ListView
        {...this.props}
        dataSource={this.state.dataSource}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        renderScrollComponent={scrollComponent}
        />
    );
  }
}

export default ListViewFull;
