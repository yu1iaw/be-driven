import { CustomButton } from '@/components/custom-button';
import { EmptyList } from '@/components/empty-list';
import { FormField } from '@/components/form-field';
import { HeaderList } from '@/components/header-list';
import { RideCard } from '@/components/ride-card';
import { icons } from '@/constants';
import { useFetch } from '@/lib/fetch';
import { checkIsLocationValid, requestLocation } from '@/lib/map-utils';
import tw from '@/lib/tailwind';
import { Ride } from '@/lib/types';
import { verifyPassword } from '@/lib/utils';
import { useLightStore } from '@/store/light-store';
import { useLocationStore } from '@/store/location-store';
import { useUserStore } from '@/store/user-store';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from "react-native-safe-area-context";



export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const setUserLocation = useLocationStore(store => store.setUserLocation);
  const initialCoords = useUserStore(store => store.initialCoords);
  const setInitialCoords = useUserStore(store => store.setInitialCoords);
  const userId = useUserStore(store => store.userId);
  const light = useLightStore(state => state.light);
  const { data: rides, loading } = useFetch<Ride[]>(userId ? `/ride/${userId}`: undefined);

  
  useEffect(() => {
    if (light === 'on') return;    
    
    const setLocation = async () => {
      const response = await requestLocation();
      if (!response) return;

      const { location, address } = response;
      
      setUserLocation({
        address: `${address[0].city}, ${address[0].region}`,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })

      const currentCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };

      if (initialCoords) {
        const isInitialLocationValid = checkIsLocationValid(initialCoords, currentCoords);

        if (!isInitialLocationValid) setShowModal(true);
      } else {
        setInitialCoords({
          latitude: currentCoords.latitude,
          longitude: currentCoords.longitude
        })
      }
    }

    setLocation();
  }, [light, initialCoords])


  return (
    <SafeAreaView style={tw`flex-1 bg-general-500`}>
      <FlatList
        data={rides?.slice(0, 5)}
        keyExtractor={item => item.ride_id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <RideCard ride={item} />
        )}
        contentContainerStyle={tw`p-4 pb-28`}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={<EmptyList loading={loading} />}
        ListHeaderComponent={<HeaderList />}
      />
      <ModalComponent
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </SafeAreaView>
  )
}

type ModalComponentProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalComponent = ({ showModal, setShowModal }: ModalComponentProps) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hashedPassword = useUserStore(store => store.hashedPassword);


  const handleSubmitPress = async (isAuth = false) => {
    setError(null);
    setIsLoading(true);

    try {
      if (!isAuth) {
        const verifiedPassword = await verifyPassword(password, `${hashedPassword}`);
        if (!verifiedPassword) return setError('Wrong password');
      }

      setShowModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleForgotPasswordPress = async () => {
    try {
      const { success } = await LocalAuthentication.authenticateAsync();
      if (!success) return;

      setError(null);
      setPassword('123456');
      await handleSubmitPress(true);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal isVisible={showModal}>
      <View style={tw`bg-white flex-center p-7 rounded-2xl gap-y-3`}>
        <Text style={tw`text-xl text-center font-JakartaBold mt-5`}>It seems like you're outside your initial location!</Text>
        <View>
          <FormField
            label='Please enter your password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize='none'
          />
          {error && error.startsWith('Wrong') && <Text style={tw`text-danger-600 absolute -bottom-3 left-3`}>{error}</Text>}
        </View>
        <TouchableOpacity
          style={tw`self-end`}
          onPress={handleForgotPasswordPress}
        >
          <Text style={tw`font-Jakarta mr-1`}>Forgot password</Text>
        </TouchableOpacity>

        <CustomButton
          title="Submit"
          IconLeft={() => !isLoading ? (
            <Image
              source={icons.lock}
              resizeMode='contain'
              tintColor="white"
              style={tw`w-5 h-5 mx-2`}
            />
          ) : (
            <View style={tw`w-5 h-5 mx-2`}>
              <ActivityIndicator size="small" />
            </View>
          )}
          onPress={() => handleSubmitPress()}
          className="mt-5"
        />
      </View>
    </Modal>
  )
}