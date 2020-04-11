import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { includes, map, remove } from 'lodash';

import { languages } from 'constants/Languages';
import Tag from '../components/Tag';
import { TouchableOpacity } from 'react-native';

export default function LinksScreen() {
  const [selectedLangs, setSelectedLangs ] = useState([]);

  onSelectedLang = lang => {
    if(includes(selectedLangs, lang)){
      remove(selectedLangs, l => l === lang);
    }else{
      selectedLangs.push(lang);
    }
    setSelectedLangs([...selectedLangs]);
  };

  onRemoveLang = lang => {
    remove(selectedLangs, l => l === lang);
    setSelectedLangs([...selectedLangs]);
  };

  renderItem = language => (
    <TouchableOpacity
      onPress={onSelectedLang.bind(null, language.name)}
      style={{
        width: '30%',
        backgroundColor: includes(selectedLangs, language.name) ? '#5e4ee0' : '#e9e9e9',
        margin: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
      }}
    >
      <Image style={{width: 70, height: 50, marginBottom: 12}} resizeMode='cover' source={language.icon} />
      <Text
        style={{
          color: includes(selectedLangs, language.name) ? 'white' : '#333'
        }}
      >
        {language.name}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', padding: 10}}>
        {
          map(selectedLangs, lang => (
            <Tag text={lang} onClose={() => onRemoveLang(lang)}/>
          ))
        }
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          {
            map(languages, renderItem)
          }
        </View>
      </ScrollView>
    </View>
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
