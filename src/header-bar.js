import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ToolbarAndroid
} from 'react-native';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
export const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;


class HeaderAndroid extends React.Component {

  getHeight() {
    return HEADER_HEIGHT;
  }

  render() {
    const {leftItem, rightItem, extraItems} = this.props;
    let actions = [];
    if (rightItem) {
      const {title, icon, layout} = rightItem;
      actions.push({
        icon: layout !== 'title' ? icon : undefined,
        title: title,
        show: 'always',
      });
    }
    if (extraItems) {
      actions = actions.concat(extraItems.map((item) => ({
        title: item.title,
        show: 'never',
      })));
    }

    const textColor = this.props.foreground === 'dark'
      ? 'dark'
      : 'white';

    let content;
    if (React.Children.count(this.props.children) > 0) {
      content = (
        <View collapsable={false} style={{flex: 1}}>
          {this.props.children}
        </View>
      );
    }

    return (
      <View style={[styles.toolbarContainer, this.props.style]}>
        <ToolbarAndroid
          navIcon={leftItem && leftItem.icon}
          onIconClicked={leftItem && leftItem.onPress}
          title={this.props.title}
          titleColor={textColor}
          subtitleColor={textColor}
          actions={actions}
          onActionSelected={this.handleActionSelected.bind(this)}
          style={styles.toolbar}>
          {content}
        </ToolbarAndroid>
      </View>
    );
  }

  handleActionSelected(position) {
    let items = this.props.extraItems || [];
    if (this.props.rightItem) {
      items = [this.props.rightItem, ...items];
    }
    const item = items[position];
    item && item.onPress && item.onPress();
  }
}

class HeaderIOS extends Component {
  static height;
  props: Props;

  render() {
    const {leftItem, title, rightItem, foreground} = this.props;
    const titleColor = foreground === 'dark' ? '#032250' : 'white';
    const itemsColor = foreground === 'dark' ? '#7F91A7' : 'white';

    const content = React.Children.count(this.props.children) === 0
      ? <Text style={[styles.titleText, {color: titleColor}]}>
      {title}
    </Text>
      : this.props.children;
    return (
      <View style={[styles.header, this.props.style]}>
        <View style={[styles.leftItem, this.props.leftItemStyle]}>
          <ItemWrapperIOS color={itemsColor} item={leftItem} />
        </View>
        <View
          accessible={true}
          accessibilityLabel={title}
          accessibilityTraits="header"
          style={[styles.centerItem, this.props.centerItemStyle]}>
          {content}
        </View>
        <View style={[styles.rightItem, this.props.rightItemStyle]}>
          <ItemWrapperIOS color={itemsColor} item={rightItem} />
        </View>
      </View>
    );
  }

}

class ItemWrapperIOS extends React.Component {

  render() {
    const {item, color} = this.props;

    if (!item) {
      return null;
    }

    let content;
    const {title, icon, layout, onPress} = item;

    if (layout !== 'icon' && title) {
      content = (
        <Text style={[styles.itemText, {color}]}>
          {title.toUpperCase()}
        </Text>
      );
    } else if (icon) {
      content = <Image source={icon} style={{height: 25, width: 10}}/>;
    }

    return (
      <TouchableOpacity
        accessibilityLabel={title}
        accessibilityTraits="button"
        onPress={onPress}
        style={styles.itemWrapper}>
        {content}
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: STATUS_BAR_HEIGHT
  },
  toolbar: {
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start'
  },
  centerItem: {
    flex: 2,
    alignItems: 'center'
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end'
  },
  itemWrapper: {
    padding: 11
  },
  itemText: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white'
  },
});

export default Platform.OS === 'ios' ? HeaderIOS : HeaderAndroid;
