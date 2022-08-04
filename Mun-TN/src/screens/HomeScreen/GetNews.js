import React, { Component } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
  } from 'react-native';
  import { useNavigation } from '@react-navigation/native';


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function NotificationsScreen() {
    const navigation = useNavigation(); 
}
class GetNews extends Component {
    state= {
        news: [],
    };
    componentDidMount(){
        this.props.navigation.setOptions({
            title: this.props.route.params.category,
        });
        fetch(`https://newsapi.org/v2/top-headlines?category=${this.props.route.params.category}&country=us&apiKey=20abdfb4e76f40bda730770b2b7ef55f`,
        ).then(res=>
            res.json()).then(response=>{
                console.log(response)
                this.setState ({
                    news: response.articles,
                });
            }).catch((error)=>{
                console.log(error);
            });

    }
    render() {
        return (
          <View style={{alignItems: 'center'}}>
            {this.state.news.length === 0 ? (
              <ActivityIndicator
                style={{
                  height: deviceHeight,
                  width: deviceWidth,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                size="large"
                color="black"
              />
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {this.state.news.map((news, index) =>
                  news.urlToImage ? (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        this.props.navigation.navigate('WebView', {
                          url: news.url,
                        })
                      }>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          backgroundColor: 'white',
                          borderRadius: 10,
                          elevation: 4,
                          width: deviceWidth - 30,
                          marginVertical: 7,
                        }}>
                        <Image
                          source={{uri: `${news.urlToImage}`}}
                          style={{height: 100, width: 100, borderRadius: 10}}
                        />
                        <Text
                          style={{
                            width: deviceWidth - 130,
                            paddingLeft: 10,
                            paddingTop: 5,
                          }}>
                          {news.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : null,
                )}
              </ScrollView>
            )}
          </View>
        );
      }
    }

export default GetNews;