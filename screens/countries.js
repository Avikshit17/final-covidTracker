import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import { SearchBar, Header } from "react-native-elements";
export default class Countries extends React.Component {
  constructor() {
    super();
    this.state = {
      countries: "",
      countriesArray: [],
      search: "",
    };
  }
  fetchCountriesData = async () => {
    console.log("city" + this.state.city);
    var link = "https://api.covid19api.com/summary";
    return fetch(link)
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        await this.setState({
          countries: data.Countries,
        });
      });
  };
  componentDidMount = async () => {
    var array = [];
    await this.fetchCountriesData();
    for (var i in this.state.countries) {
      array.push(this.state.countries[i]);
    }
    await this.setState({
      countriesArray: array,
    });
  };
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.state.countriesArray.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.Country
        ? item.Country.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      countries: newData,
      search: text,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../CountriesImage.jpeg")}
          style={{ flex: 1, resizeMode: "cover" }}
        >
          <View>
            <Header
              centerComponent={{
                text: "Countries Data",
                style: { fontSize: 25 },
              }}
            ></Header>
            <SearchBar
              round
              searchIcon={{ size: 25 }}
              onChangeText={(text) => this.SearchFilterFunction(text)}
              onClear={(text) => this.SearchFilterFunction("")}
              placeholder="Search Country"
              value={this.state.search}
            />
            <FlatList
              data={this.state.countries}
              renderItem={({ item }) => {
                var code =
                  "https://www.countryflags.io/" +
                  item.CountryCode +
                  "/flat/64.png";
                return (
                  <View style={styles.subContainer}>
                    <View style={{borderWidth:2,borderRadius:10,width:50,height:50,justifyContent:"center",marginRight:10}}>
                    <Image
                      source={{ uri: code }}
                      style={{ width: 50, height: 50,resizeMode:"contain",right:3.5 }}
                    ></Image>
                    </View>
                    <Text style={styles.text}>{item.Country}</Text>
                    <View>
                      <Text>New Confirmed:{item.NewConfirmed}</Text>
                      <Text>New Death:{item.NewDeaths}</Text>
                      <Text>New RecoveredL{item.NewRecovered}</Text>
                    </View>
                  </View>
                );
              }}
            ></FlatList>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    flexDirection: "row",
    marginTop: 30,
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor:"#82EEFD",
    width: 400,
    height: 100,
    justifyContent:"center"
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
  
});
