import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const Header = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  flex-direction: row;
`;
export const AvatarButton = styled.TouchableOpacity`
  margin-top: 34px;
`;
export const OutButton = styled.TouchableOpacity`
  margin-top: 34px;
`;

export const Avatar = styled.Image`
  top: -50px;
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;
