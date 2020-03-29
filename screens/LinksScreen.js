import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { map } from 'lodash';

import languages from 'constants/Languages';
import Tag from '../components/Tag';
import { TouchableOpacity } from 'react-native';

export default function LinksScreen() {
  const [selectedLangs, setSelectedLangs ] = useState([]);

  onSelectedLang = lang => setSelectedLangs([...selectedLangs, lang]);

  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={onSelectedLang.bind(null, item)}
    >
      <View style={{padding: 10, justifyContent: 'center'}}>
        <Text>{item}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {
          map(selectedLangs, lang => (
            <Tag text={lang} />
          ))
        }
      </View>
      <FlatList
          items={languages}
          renderItem={renderItem}
      />
    </>
  );
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
