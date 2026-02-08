import { Text, View,  StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { useState } from 'react';


import IconButton from '../components/IconButton';
import CircleButton from '../components/CircleButton';
import EmojiPicker from '../components/EmojiPicker';

import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from '../components/ImageViewer';


const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState<boolean>(false);


  const PickerImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      console.log('Image selection was canceled');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsEmojiPickerVisible(true);
  };

  const onCloseEmojiPicker = () => {
    setIsEmojiPickerVisible(false);
  }

  const onSaveImageAsync = async () => {
    // we will implement this later
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      {showAppOptions? (
        < View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
      <View style={styles.footerContainer}>
        <Button label="Take a photo" theme="primary" onPress={PickerImageAsync} />
        <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
      </View>
      )}
      <EmojiPicker isVisible={isEmojiPickerVisible} onClose={onCloseEmojiPicker}>
        {//add emoji picker component here
       }
      </EmojiPicker>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/tabs/about" style={styles.button}>
      Go To About Screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    padding: 10,
    backgroundColor: '#565a5e',
    borderRadius: 5,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerContainer: {
    width: '100%',
    padding: 20,
    justifyContent: 'space-between',
    flex: 1/3,
    alignItems: 'center',
  },
});
