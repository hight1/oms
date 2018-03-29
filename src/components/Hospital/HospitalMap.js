import React from 'react'
import { Map, Marker } from 'react-amap'
import { Input, Radio, message } from 'antd'


const Search = Input.Search
const RadioGroup = Radio.Group

const searchBarStyle = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  right: '10px',
  padding: '5px 10px',
  border: '1px solid #d3d3d3',
  backgroundColor: '#f9f9f9',
}
 /* global  AMap:true*/
class HospitalMap extends React.Component {
  constructor (props) {
    super(props)
    const self = this
    this.map = null
    this.toolBar = null
    this.marker = null
    this.geocoder = null
    this.placeSearch = null
    this.geolocation = null
    this.mapEvents = {
      created (map) {
        self.map = map
        // let AMap = new AMap.Map('container');
        AMap.plugin('AMap.Geocoder', () => {
          self.geocoder = new AMap.Geocoder()
        })
        AMap.service(['AMap.PlaceSearch'], () => {
          self.placeSearch = new AMap.PlaceSearch({ // 构造地点查询类
            pageSize: 15,
            pageIndex: 1,
            type: '医疗保健服务',
            city: '010', // 城市
            map: self.map,
          })
          // self.placeSearch.search(self.state.hospitalName, (status, result) => {
          //   console.log(result)
          // })
        })
        AMap.plugin('AMap.Geolocation', () => {
          self.geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000,          // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           // 定位结果缓存0毫秒，默认：0
            convert: true,           // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        // 显示定位按钮，默认：true
            buttonPosition: 'LB',    // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true,      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          })
          map.addControl(self.geolocation)
          self.geolocation.getCurrentPosition()
          AMap.event.addListener(self.geolocation, 'complete', self.onGeolocationComplete.bind(self))// 返回定位信息
          AMap.event.addListener(self.geolocation, 'error', (geolocationError) => {
            if (geolocationError.info === 'NOT_SUPPORTED') {
              message.error('当前浏览器不支持定位功能，请在页面顶部手动输入医院进行搜索。')
            } else {
              message.error('定位失败！请在页面顶部手动输入医院进行搜索。')
            }
          })
        })
      },
      click (e) {
        const lnglat = e.lnglat
        self.placeSearch.searchNearBy('', lnglat, 5000, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            self.setState({
              poiList: result.poiList.pois,
            })
          }
        })
        self.setState({
          position: lnglat,
        })
      },
    }
    this.markerEvents = {}
    this.plugins = [
      'Scale',
      {
        name: 'ToolBar',
        options: {
          locate: false,
          autoPosition: false,
          onCreated (ins) {
            self.toolBar = ins
            // self.toolBar.on('location', self.onGeolocationComplete.bind(self));
            // console.log(ins)
          },
        },
      },
    ]
    this.state = {
      hospitalName: this.props.hospitalName,
      keywords: '',
      poiList: [],
      position: { longitude: 116, latitude: 39 },
    }
  }

  onGeolocationComplete (geolocationResult) {
    console.log(this.placeSearch)
    const self = this
    console.log(geolocationResult)
    self.placeSearch.search(self.state.hospitalName, (status, result) => {
      console.log(result)
      self.setState({
        poiList: result.poiList.pois,
      })
    })
    // self.placeSearch.searchNearBy('', geolocationResult.position, 5000, (status, result) => {
    //   if (status === 'complete' && result.info === 'OK') {
    //     self.setState({
    //       poiList: result.poiList.pois,
    //     })
    //   }
    // })
    // this.setState(
    //   {
    //     position: {
    //       longitude: geolocationResult.position.getLng(),
    //       latitude: geolocationResult.position.getLat(),
    //     },
    //   },
    // )
  }

  onSubmitSearch (val) {
    const self = this
    // self.placeSearch.search(this.state.keywords, (status, result) => {
    //   if (status === 'complete' && result.info === 'OK') {
    //     self.setState({
    //       poiList: result.poiList.pois,
    //     })
    //   }
    // })
    self.placeSearch.search(val, (status, result) => {
      if (status === 'complete' && result.info === 'OK') {
        self.setState({
          poiList: result.poiList.pois,
        })
      }
    })
  }

  // onChangeKeywords (value) {
  //   this.setState({
  //     keywords: value,
  //   })
  // }

  // onClear () {
  //   this.setState({
  //     keywords: '',
  //   })
  // }

  onSearchResultClick (poi) {
    const { location, address, pname, cityname, adname } = poi
    // this.setState({
    //   currentLocation: name,
    // })
    this.props.onSelectHosptital({
      // name,
      address: address,
      // citycode,
      pname: pname,
      cityname: cityname,
      adname: adname,
      lat: location.getLat(),
      lng: location.getLng(),
    })
  }
  render () {
    const radioStyle = {
      // display: 'block',
      width: '100%',
      marginLeft: '1rem',
      cursor: 'pointer',

    }
    const itemStyle = {
      marginBottom: '1rem',
      marginTop: '1rem',
      width: '100%',
      cursor: 'pointer',
    }
    // let rowStyle = {
    //   backgroundColor: this.state.checked ? '#4eaaec' : '#ffffff',
    //   width: '100%',
    //   cursor: 'pointer',
    //   border: this.state.checked ? '1px solid  #666666' : '1px solid  red',

    // }
    return (
      <div style={{ width: '100%', height: '400px' }}>
        <Map amapkey={'506a77f039501bc77d18b0f9450bf20f'} events={this.mapEvents} plugins={this.plugins}>
          <div className="customLayer" style={searchBarStyle}>
            <Search
              placeholder="搜索医院"
              defaultValue={this.state.hospitalName}
              // onChange={this.onChangeKeywords.bind(this)}
            // onClear={this.onClear.bind(this)}
              onSearch={this.onSubmitSearch.bind(this)}
            />
          </div>
          <div >
            {
              <RadioGroup>
                {
                 this.state.poiList.map((item) => {
                   return (
                    // <div
                    //   key={item.id}
                    //   onClick={() => this.onSearchResultClick(item)}
                    //   style={{ width: '100%', cursor: 'pointer', border: '1px solid #666666' }}

                    // >
                    //   <p style={rowStyle}>
                    //     {item.name}<p> 地址：{item.address}</p>
                    //     <p> 经度：{item.location.lat}  纬度：{item.location.lng}</p>
                    //   </p>
                    // </div>
                     <div key={item.id}
                       onClick={() => this.onSearchResultClick(item)}
                       style={itemStyle}
                     >
                       <div style={{ marginLeft: '2.4rem' }}>{item.name}</div>
                       <Radio style={radioStyle} value={item.id}>
                         地址：{item.address}
                       </Radio>
                       <div style={{ marginLeft: '2.4rem' }}> 经度：{item.location.lat}  纬度：{item.location.lng}</div>

                     </div>
                  )
                 })

               }

              </RadioGroup>
         }
          </div>
          <Marker position={this.state.position} events={this.markerEvents} />
        </Map>
      </div>
    )
  }
}

export default HospitalMap
