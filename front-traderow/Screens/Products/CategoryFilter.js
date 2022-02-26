import React from 'react-native';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem, Badge, Text} from 'native-base';

const CategoryFilter = (props) => {

    return (
      <ScrollView
      bounce={true}
      horizontal={true}
      style={{ backgroundColor: '#f2f2f2'}}
      >
       <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
           <TouchableOpacity key={1}
           onPress={() => {
               props.CategoryFilter('all'), props.setActive(-1);
           }}
           >
                 <Badge style={[styles.center, { margin: 5 }, props.active == -1 ? styles.active : styles.inactive]}>
                  <Text style={{ color: '#fff' }}>all</Text>
                 </Badge>
           </TouchableOpacity>
           {
               props.categories.map((item) => (
                   <TouchableOpacity
                    key={item._id}
                    onPress={() => {
                        props.CategoryFilter(item._id),
                        props.setActive(props.categories.indexeOf(item))
                    }}
                   >
                    <Badge
                     style={[styles.center, { margin: 5 }, props.active == props.categories.indexeOf(item) ? styles.active : styles.inactive]}
                    >
                     <Text style={{ color: '#fff' }}>{item.name}</Text>
                    </Badge>
                   </TouchableOpacity>
               ))
           }
       </ListItem>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    active: {
        backgroundColor: '#03bafc',
    },
    inactive: {
        backgroundColor: '#a0e1eb'
    }
})

export default CategoryFilter;