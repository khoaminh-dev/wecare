import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { WeCareSite } from './src/WeCareSite';

export default function App() {
  const [loaded, error] = useFonts({
    'WeCare Editorial': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
    'WeCare Italic': require('./assets/fonts/PlayfairDisplay-Italic.ttf'),
    'WeCare Sans': require('./assets/fonts/BeVietnamPro-Regular.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'DancingScript-Regular': require('./assets/fonts/DancingScript-Regular.ttf'),
    'DancingScript-SemiBold': require('./assets/fonts/DancingScript-SemiBold.ttf'),
  });

  if (!loaded && !error) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFCFB' }}><Text>WeCare</Text></View>;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <WeCareSite />
    </View>
  );
}
