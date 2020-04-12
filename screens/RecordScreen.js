import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { map, filter, includes } from 'lodash';
import { observer } from 'mobx-react-lite';
import { inject } from 'mobx-react';

import LanguageRecord from 'components/LanguageRecord';
import { languages } from 'constants/Languages'

const RecordScreen = ({UserStore}) => {
    const sl = UserStore.user.speakingLanguages;
    const [recordingLang, setRecordingLang] = useState([]);

    useEffect(() => {
        const hsdjfh = filter(languages, language => includes(sl, language.name));
        setRecordingLang(hsdjfh);
    }, [])
    return(
        <View>
            {
                map(recordingLang, lang => <LanguageRecord key={lang.name} language={lang} isRecording={recordingLang === lang.name}/>)
            }
        </View>
    )
}

export default inject('UserStore')(observer(RecordScreen));