import * as React from "react";
import { Pressable, View, Text, useWindowDimensions, Image, ScrollView } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Icon from "@expo/vector-icons/FontAwesome6";

const PAGE_WIDTH = 60;
const PAGE_HEIGHT = 50;
const DATA = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function Resultados() {
  const r = React.useRef<ICarouselInstance>(null);
  const [autoPlay, setAutoPlay] = React.useState(false);
  const [loop, setLoop] = React.useState(false);
  const window = useWindowDimensions();

  return (
    <View style={{ flex: 1 }}>
      <View style={{}}>
        <Carousel
          key={`${loop}`}
          ref={r}
          loop={loop}
          style={{
            width: window.width,
            height: PAGE_HEIGHT,
            justifyContent: "center",
            alignItems: "center",
          }}
          width={PAGE_WIDTH}
          height={PAGE_HEIGHT}
          data={DATA}
          renderItem={({ item, animationValue }) => {
            return (
              <Item
                animationValue={animationValue}
                label={item}
                onPress={() =>
                  r.current?.scrollTo({
                    count: animationValue.value,
                    animated: true,
                  })
                }
              />
            );
          }}
          autoPlay={autoPlay}
        />
      </View>
          
      <View className="flex flex-row justify-center items-center p-3 gap-2 rounded-t-full bg-white w-[40%] mx-auto">
        <Icon name="clock" size={16} color="#0E7C7B" />
        <Text className="text-light-primary ">12:20 pm</Text>
      </View>
      <View
        className="w-[90%] mx-auto rounded-md flex flex-row justify-center items-center bg-white py-5"
      >
        <View className="gap-2 justify-center items-center w-[40%]">
          <Image className=" rounded-lg" source={{uri:"https://res.cloudinary.com/duyh7uidy/image/upload/v1740290652/oi0ryuz1treixc8ucrq1.jpg"}} width={50} height={50} resizeMode="cover" />
          <Text ellipsizeMode="tail" numberOfLines={1}>Manchester United</Text>
        </View>
        <View className="w-[20%] justify-center items-center flex-row gap-2">
          <Text className="text-light-primary text-2xl">0</Text>
          <Text className="text-light-primary text-2xl">:</Text>
          <Text className="text-light-primary text-2xl">1</Text>
        </View>
        <View className="gap-2 justify-center items-center w-[40%]">
          <Image className=" rounded-lg" source={{uri:"https://res.cloudinary.com/duyh7uidy/image/upload/v1740481464/zlyn6ouztxlnolqx5edr.jpg"}} width={50} height={50} resizeMode="cover" />
          <Text ellipsizeMode="tail" numberOfLines={1}>Liverpool</Text>
        </View>
      </View>
      



    </View>
  );
}

export default Resultados;

interface Props {
  animationValue: Animated.SharedValue<number>;
  label: string;
  onPress?: () => void;
}

const Item: React.FC<Props> = (props) => {
  const { animationValue, label, onPress } = props;

  const translateY = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  }, [animationValue]);

  const labelStyle = useAnimatedStyle(() => {
    const scale = interpolate(animationValue.value, [-1, 0, 1], [1, 1.25, 1], Extrapolation.CLAMP);

    const color = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["#00000090", "#FF6600", "#00000090"]
    );

    return {
      transform: [{ scale }],
      color,
    };
  }, [animationValue]);

  const onPressIn = React.useCallback(() => {
    translateY.value = withTiming(-8, { duration: 300 });
  }, [translateY]);

  const onPressOut = React.useCallback(() => {
    translateY.value = withTiming(0, { duration: 300 });
  }, [translateY]);

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[
          {
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          },
          containerStyle,
        ]}
      >
        <Animated.Text style={[{ fontSize: 18, color: "#26292E",  }, labelStyle]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};