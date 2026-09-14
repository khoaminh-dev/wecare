import type { ReactNode } from 'react';
import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { icons, type IconName } from './assets';
import { colors, fonts } from './theme';

export function Icon({ name, size = 24, color = colors.primary, style }: { name: IconName; size?: number; color?: string; style?: StyleProp<ImageStyle> }) {
  return <Image source={icons[name]} resizeMode="contain" style={[{ width: size, height: size, tintColor: color }, style]} />;
}

export function Button({ children, onPress, primary = false, inverse = false, icon = 'arrow', compact = false }: { children: ReactNode; onPress: () => void; primary?: boolean; inverse?: boolean; icon?: IconName | null; compact?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        compact && styles.buttonCompact,
        primary && styles.buttonPrimary,
        inverse && styles.buttonInverse,
        pressed && styles.buttonActive,
      ]}
    >
      <Text style={[styles.buttonText, (primary || inverse) && styles.buttonTextPrimary]}>{children}</Text>
      {icon ? <Icon name={icon} size={compact ? 14 : 16} color={primary || inverse ? colors.white : colors.primary} /> : null}
    </Pressable>
  );
}

export function SectionHeading({ eyebrow, title, description, action, dark = false }: { eyebrow?: string; title: string; description?: string; action?: ReactNode; dark?: boolean }) {
  return (
    <View style={styles.sectionHeading}>
      <View style={styles.sectionHeadingCopy}>
        {eyebrow ? <Text style={[styles.eyebrow, dark && styles.darkMuted]}>{eyebrow}</Text> : null}
        <Text accessibilityRole="header" style={[styles.heading, dark && styles.whiteText]}>{title}</Text>
        {description ? <Text style={[styles.description, dark && styles.darkBody]}>{description}</Text> : null}
      </View>
      {action}
    </View>
  );
}

export function Frame({ children, style, mobile }: { children: ReactNode; style?: StyleProp<ViewStyle>; mobile: boolean }) {
  return <View style={[styles.frame, { paddingHorizontal: mobile ? 20 : 48 }, style]}>{children}</View>;
}

export function BodyText({ children, style, dark = false }: { children: ReactNode; style?: StyleProp<TextStyle>; dark?: boolean }) {
  return <Text style={[styles.body, dark && styles.darkBody, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  frame: { width: '100%', maxWidth: 1296, alignSelf: 'center' },
  button: { minHeight: 46, borderRadius: 999, borderWidth: 1, borderColor: '#A7C8C2', paddingHorizontal: 22, paddingVertical: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14, backgroundColor: 'transparent' },
  buttonCompact: { minHeight: 40, paddingHorizontal: 17, paddingVertical: 8 },
  buttonPrimary: { backgroundColor: colors.primary, borderColor: colors.primary },
  buttonInverse: { borderColor: 'rgba(255,255,255,.65)' },
  buttonActive: { opacity: 0.82, transform: [{ translateY: -1 }] },
  buttonText: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.primary },
  buttonTextPrimary: { color: colors.white },
  sectionHeading: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 24 },
  sectionHeadingCopy: { maxWidth: 760, flexShrink: 1 },
  eyebrow: { fontFamily: fonts.semiBold, fontSize: 10, letterSpacing: 2, color: '#416E69', marginBottom: 9 },
  heading: { fontFamily: fonts.semiBold, fontSize: 36, lineHeight: 41, letterSpacing: -1.4, color: colors.ink },
  description: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 21, color: colors.muted, marginTop: 8 },
  body: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 21, color: colors.muted },
  whiteText: { color: colors.white },
  darkMuted: { color: '#CBE4D8' },
  darkBody: { color: '#D8E7E0' },
});
