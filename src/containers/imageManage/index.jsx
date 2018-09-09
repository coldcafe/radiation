import React, { Component } from 'react';
import LevelBcrumb from '../../component/bcrumb/level1Bcrumb';
import { Button, Upload, message, Modal, Icon } from 'antd';
require('./style/index.less');
import LoginService from '../../services/loginService';
import Config from '../../config';


class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteimg: false,
            visible: false,

        }
    }
    deleteChooseImg = () => {
        this.setState({
            visible: false,
        });
        LoginService.deleteSketchmap(this.props.item.id, response => {
            message.success('点位示意图删除成功');
            this.props.getsketchmap();
        }, error => {
            message.error('点位示意图删除失败');
        });
    }
    render() {
        var { item, setCurrentUrl } = this.props;
        return (
            <div>
                <li className="pic-wall large-view"
                    key={item.id}
                    onClick={(e) => { setCurrentUrl(item.pic) }}
                    onMouseMove={() => { this.setState({ showDeleteimg: true }) }}
                    onMouseLeave={() => { this.setState({ showDeleteimg: false }) }}
                >
                    <img src={Config.downimgUrl+item.pic} alt="" style={{ width: '200px', height: 'auto' }} />
                    {
                        this.state.showDeleteimg === true ?
                            <Button
                                style={{position: 'absolute', top: 10, right: 10,
                                    display:'flex',alignItems:'center',
                                    backgroundColor:'transparent',fontSize:20,color:'white',borderColor:'transparent'}}
                                onClick={(e) => { e.stopPropagation(); this.setState({ visible: true }) }}
                                icon={'delete'}
                            >            
                            </Button>
                            : null
                    }
                </li>
                <Modal
                    onCancel={() => { this.setState({ visible: false }) }}
                    onOk={() => { this.deleteChooseImg() }}
                    title={'删除点位示意图模版'}
                    visible={this.state.visible}

                >
                    <div
                        style={{
                            display: 'flex', width: 200, height: 100, flexDirection: 'column',
                            alignItems: 'center', alignContent: 'center'
                        }}
                    >
                        <text
                            style={{ fontSize: 15, textAlign: 'center' }}
                        >确定要删除这张点位示意图</text>
                    </div>
                </Modal>
            </div>
        )
    }
}

class ImageManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pictures: [],
            previewVisible: false,
            currentUrl: '',
            showDeleteimg: false,  //显示删除的图标
        }
    }
    getUploadSuccess = (info) => {
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
            //上传成功
            LoginService.upLoadsketchmap({ pic:info.file.response, }, (response) => {
                message.success('图片上传成功');
                this.getsketchmap();
            }, (error) => {
                message.error('图片上传失败');

            });
        } else if (info.file.status === 'error') {
            message.error('图片上传失败');
        }
    }
    cancelModal = () => {
        this.setState({
            previewVisible: false
        })
    }
    setCurrentUrl = (val) => {
        this.setState({
            currentUrl: val,
            previewVisible: true
        })
    }
    getsketchmap = () => {
        LoginService.getListsketchmap(null, (response) => {
            this.setState({
                pictures: response,
            });

        }, (error) => {

            console.log(error);
        })
    }
    componentDidMount() {
        this.getsketchmap();
    }
    render() {
        return (
            <view>
                <LevelBcrumb title="视图模版" />
                <div>
                    <Upload
                        accept='image/*'
                        action={Config.uploadimgUrl}
                        onChange={(info) => {
                            this.getUploadSuccess(info)
                        }}
                    >
                        <Button
                            type="upload"
                            size="large"
                            style={{ marginBottom: 20, height: 30, width: 150 }}

                        >上传点位示意图</Button>
                    </Upload>
                </div>
                <div>
                    <ul className="pic-container">
                        {this.state.pictures.map((item, index) => {
                            return (
                                <ImageItem  key={item.id} item={item} setCurrentUrl={this.setCurrentUrl} getsketchmap={this.getsketchmap} />
                            )
                        })}
                    </ul>
                </div>

                <Modal visible={this.state.previewVisible} footer={null} onCancel={() => { this.cancelModal() }}>
                    <img alt="example" style={{ width: '100%' }} src={this.state.currentUrl} />
                </Modal>
            </view>
        );
    }
}
export default ImageManage;