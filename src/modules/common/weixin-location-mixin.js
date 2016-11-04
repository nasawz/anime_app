module.exports = {
    componentWillMount() {
    },
    getLocationInfo() {
        if (this.state.show) {
            return {
                city: this.state.location_city,
                address: this.state.location_address,
                geoPoint: this.state.geoPoint
            }
        } else {
            return {
                city: '',
                address: '',
                geoPoint: null
            }
        }
    },
    getLocation() {
        let self = this
        self.setState({
            location_loading: true,
            location_city: '未知',
            location_address: '未知',
            location_business: '未知',
            location_addressComponents: null,
            location_error: null,
            geoPoint: null
        })

        window.wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function(res) {
                self.getAddress({
                    latitude: res.latitude,
                    longitude: res.longitude
                })
            },
            fail: function(res) {
                self.setState({
                    location_loading: false,
                    location_error: res.errMsg
                })
            }
        })
    },
    getAddress(point) {
        let self = this
        let baiduPoint = new window.BMap.Point(point.longitude, point.latitude)
        let geoc = new window.BMap.Geocoder()

        geoc.getLocation(baiduPoint, (rs) => {
            let parseAddress = function(ac) {
                let address = ac.province
                if (address != ac.city) {
                    address = address + ac.city
                }
                address = address + ac.district
                address = address + ac.street
                return address
            }
            self.setState({
                location_loading: false,
                location_city: rs.addressComponents.city,
                location_address: parseAddress(rs.addressComponents),
                location_business: rs.business,
                location_addressComponents: rs.addressComponents,
                geoPoint: point
            })
        })
    }
}
