import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { includes, map, remove } from 'lodash';
import { observer } from 'mobx-react-lite';
import { inject } from 'mobx-react';

import { languages } from 'constants/Languages';
import Tag from '../components/Tag';
import BottomModal from '../components/BottomModal';

const  LinksScreen = ({UserStore, navigation}) => {
  const [selectedLangs, setSelectedLangs ] = useState([]);
  const [isShowSelectLangsModal, setShowSelectLangsModal ] = useState(false);

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
      key={language.name}
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
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{padding: 15}}
          onPress={() => setShowSelectLangsModal(true)}
        >
          <Text>Your speaking languages</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', padding: 10}}>
          {
            map(selectedLangs, lang => (
              <Tag text={lang} onClose={() => onRemoveLang(lang)}/>
            ))
          }
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          UserStore.setUserSpeakingLanguages(selectedLangs);
          navigation.navigate('Records');
        }}
        style={{
          justifyContent: 'center',
          backgroundColor: '#5e40e0',
          alignItems: 'center',
          padding: 20
        }}
      >
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Next</Text>
      </TouchableOpacity>
      
      <BottomModal
        style={{flex: 1, margin: 0, justifyContent: 'flex-end'}}
        isVisible={isShowSelectLangsModal}
        onBackdropPress={() => setShowSelectLangsModal(false)}
      >
        <View style={{backgroundColor: 'white'}}>
          <View>
            <Text>Select languages</Text>
          </View>
          <ScrollView>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {
                map(languages, renderItem)
              }
            </View>
          </ScrollView>
        </View>
      </BottomModal>
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

export default inject('UserStore')(observer(LinksScreen))
