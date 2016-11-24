import React, {PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';


export default function ListItem({title, description, titleStyle,
  leftItem, leftItemStyle, style, onPress, rightStyle}) {
  let titleElement = title;
  let descElement = description;
  let leftItemElement;

  if (typeof title === 'string') {
    titleElement = <Text style={[styles.title, titleStyle]}>{title}</Text>
  }
  if (typeof description === 'string') {
    descElement = <Text style={styles.description}>{description}</Text>
  }
  if (leftItem) {
    leftItemElement = (
      <View style={[styles.leftItem, leftItemStyle]}>
        {leftItem}
      </View>
    )
  }

  const content = (
    <View style={[styles.item, style]}>
      {leftItemElement}
      <View style={[{flex: 2}, rightStyle]}>
        {titleElement}
        {descElement}
      </View>
    </View>
  );

  if(onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.any.isRequired,
  titleStyle: PropTypes.any,
  leftItem: PropTypes.element,
  leftItemStyle: PropTypes.any,
  titleStyle: PropTypes.any
};

const styles = StyleSheet.create({
  item: {
    paddingTop: 10,
    flexDirection: 'row'
  },
  title: {
    fontSize: 21
  },
  description: {
    textAlign: 'justify'
  },
  leftItem: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
