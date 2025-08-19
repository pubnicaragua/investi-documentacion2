import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Users } from 'lucide-react-native';
import { getCommunityList, joinCommunity } from '../api';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export const CommunitiesListScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [communities, setCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommunities();
  }, []);

  const loadCommunities = async () => {
    try {
      const data = await getCommunityList();
      setCommunities(data);
    } catch (error) {
      console.error('Error loading communities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinCommunity = async (communityId: string) => {
    try {
      await joinCommunity('user-id', communityId);
      setJoinedCommunities(prev => [...prev, communityId]);
    } catch (error) {
      console.error('Error joining community:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text>Cargando comunidades...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
          <Text className="text-xl font-bold">{t('communities.title')}</Text>
          <LanguageSwitcher />
        </View>

        <ScrollView className="flex-1 p-4">
          <View className="space-y-4">
            {communities.map((community: any) => (
              <View
                key={community.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <View className="flex-row items-center mb-3">
                  <Image
                    source={{ uri: community.image_url || 'https://softwarenicaragua.com/wp-content/uploads/2025/04/image_2025-04-11_071419058.png' }}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <View className="flex-1">
                    <Text className="font-bold text-lg mb-1">
                      {community.name}
                    </Text>
                    <View className="flex-row items-center mb-1">
                      <Users size={16} color="#6B7280" />
                      <Text className="text-gray-500 ml-1">
                        {community.member_count || 0} {t('communities.members')}
                      </Text>
                      <Text className="text-gray-400 mx-2">•</Text>
                      <Text className="text-gray-500">
                        {t('communities.publicCommunity')}
                      </Text>
                    </View>
                  </View>
                </View>
                
                {community.description && (
                  <Text className="text-gray-600 mb-4">
                    {community.description}
                  </Text>
                )}
                
                <TouchableOpacity
                  className={`py-3 rounded-xl ${
                    joinedCommunities.includes(community.id)
                      ? 'bg-green-500'
                      : 'bg-blue-500'
                  }`}
                  onPress={() => handleJoinCommunity(community.id)}
                  disabled={joinedCommunities.includes(community.id)}
                >
                  <Text className="text-white text-center font-semibold">
                    {joinedCommunities.includes(community.id)
                      ? 'Unido'
                      : t('communities.join')
                    }
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
