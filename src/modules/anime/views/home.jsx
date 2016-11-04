/**
 * create by nasa.wang
 */
import React from 'react'
import List from 'cex/components/list/list.jsx'
import ItemTitle from 'cex/components/list/item-title.jsx'
import ItemCell from 'cex/components/list/item-cell.jsx'

import NavigateMixin from '../../common/navigate-mixin.js'

const Home = React.createClass({
    mixins:[NavigateMixin],
    onClickLink(obj) {
        let _path = obj.params
        let _querys = null
        this.navTo(_path, _querys, this.context.runType, '/#/')
    },
    render() {
        return (
            <List>
                <ItemCell link={{params:['anime','transforms3d']}} onClickLink={this.onClickLink}>
                    <ItemTitle>
                        3D变形
                    </ItemTitle>
                </ItemCell>
                <ItemCell link={{params:['anime','colors']}} onClickLink={this.onClickLink}>
                    <ItemTitle>
                        颜色
                    </ItemTitle>
                </ItemCell>
                <ItemCell link={{params:['anime','domstress']}} onClickLink={this.onClickLink}>
                    <ItemTitle>
                        DOM压力测试
                    </ItemTitle>
                </ItemCell>
            </List>

        )
    }

})

export default Home
