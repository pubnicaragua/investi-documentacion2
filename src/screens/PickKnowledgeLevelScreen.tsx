import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react-native';
import { updateUser } from '../api';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

const LEVELS = [
  { key: 'none', label: 'knowledge.none' },
  { key: 'basic', label: 'knowledge.basic' },
  { key: 'intermediate', label: 'knowledge.intermediate' },
  { key: 'advanced', label: 'knowledge.advanced' },
];

export const PickKnowledgeLevelScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedLevel) return;
    
    setLoading(true);
    try {
      await updateUser('user-id', { nivel_finanzas: selectedLevel });
      navigation.navigate('CommunityRecommendations');
    } catch (error) {
      console.error('Error updating knowledge level:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        <View className="flex-row items-center justify-between py-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <LanguageSwitcher />
        </View>

        <View className="flex-1 justify-center">
          <Text className="text-2xl font-bold text-center mb-4">
            {t('knowledge.title')}
          </Text>
          
          <Text className="text-gray-600 text-center mb-12">
            {t('knowledge.subtitle')}
          </Text>

          <View className="space-y-4 mb-12">
            {LEVELS.map((level) => (
              <TouchableOpacity
                key={level.key}
                className={`p-6 rounded-xl border-2 ${
                  selectedLevel === level.key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
                onPress={() => setSelectedLevel(level.key)}
              >
                <Text
                  className={`text-center font-medium text-lg ${
                    selectedLevel === level.key
                      ? 'text-blue-600'
                      : 'text-gray-700'
                  }`}
                >
                  {t(level.label)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            className="bg-blue-500 py-4 rounded-xl"
            onPress={handleContinue}
            disabled={loading || !selectedLevel}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {loading ? 'Guardando...' : t('knowledge.continue')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
