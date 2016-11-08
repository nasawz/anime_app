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
                <ItemCell link={{params:['css3d','cylinder']}} onClickLink={this.onClickLink}>
                    <ItemTitle>
                        环形旋转
                    </ItemTitle>
                </ItemCell>
                <ItemCell link={{params:['css3d','pano']}} onClickLink={this.onClickLink}>
                    <ItemTitle>
                        内360
                    </ItemTitle>
                </ItemCell>
                <ItemCell link={{params:['css3d','rubik']}} onClickLink={this.onClickLink}>
                    <ItemTitle>
                        魔方
                    </ItemTitle>
                </ItemCell>
                <ItemCell link={{params:['css3d','scene1']}} onClickLink={this.onClickLink}>
                    <ItemTitle>
                        场景1
                    </ItemTitle>
                </ItemCell>
                <ItemCell link={{params:['css3d','scene2']}} onClickLink={this.onClickLink}>
                    <ItemTitle>
                        场景2
                    </ItemTitle>
                </ItemCell>
                <ItemCell link={{params:['css3d','scene3']}} onClickLink={this.onClickLink}>
                    <ItemTitle>
                        场景3
                    </ItemTitle>
                </ItemCell>
            </List>

        )
    }

})

export default Home
