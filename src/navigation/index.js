import { Navigation } from "react-native-navigation";
import App from "../../App";
import BeiCircle from "../screen/BeiCircle";
import BeiHealth from "../screen/BeiHealth";
import BeiRun from "../screen/BeiRun";
import BeiStore from "../screen/BeiStore";
import InputAuthCore from "../screen/InputAuthCore";
import Introduction from "../screen/Introduction";
import Login from "../screen/Login";
import My from "../screen/My";
import DynamicDetail from '../components/DynamicDetail'
import ShareCom from '../components/ShareCom'
import HealthDataShow from '../components/HealthData'
import HistorySay from '../components/HistorySay'


Navigation.registerComponent('My', () => My);
Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Introduction', () => Introduction);
Navigation.registerComponent('InputAuthCore', () => InputAuthCore);
Navigation.registerComponent('BeiStore', () => BeiStore);
Navigation.registerComponent('BeiRun', () => BeiRun);
Navigation.registerComponent('BeiHealth', () => BeiHealth);
Navigation.registerComponent('BeiCircle', () => BeiCircle);
Navigation.registerComponent('App', () => App);
Navigation.registerComponent('DynamicDetail', () => DynamicDetail);
Navigation.registerComponent('ShareCom', () => ShareCom);
Navigation.registerComponent('HealthDataShow', () => HealthDataShow);
Navigation.registerComponent('HistorySay', () => HistorySay);

// 引导页
export const WelcomeScreen = {
    root: {
        stack: {
            id: 'WELCOMESCREEN',
            children: [
                {
                    component: {
                        name: 'Introduction'
                    }
                }
            ]
        }
    }
}


// 登录页
export const LoginRoot = {
    root: {
        stack: {
            id: 'Login_LAYOUT',
            children: [
                {
                    component: {
                        name: 'Login'
                    }
                }
            ]
        }
    }
}


// 主内容
export const MainRoot = {
    root: {
        bottomTabs: {
            id: 'BOTTOM_TABS_LAYOUT',
            children: [
                {
                    stack: {
                        id: 'HOME_TABS',
                        children: [
                            {
                                component: {
                                    id: 'BEI_CIRCLE_SCREEN',
                                    name: 'BeiCircle'
                                }
                            }
                        ],
                        options: {
                            bottomTab: {
                                text: '圈子',
                                icon: require('../assets/home.png'),
                                selectedIcon: require('../assets/select_home.png'),
                            }
                        }
                    }
                },
                {
                    stack: {
                        id: 'HOME_TABS',
                        children: [
                            {
                                component: {
                                    id: 'BEI_HEALTH_SCREEN',
                                    name: 'BeiHealth'
                                }
                            }
                        ],
                        options: {
                            bottomTab: {
                                text: '健康',
                                icon: require('../assets/xiai.png'),
                                selectedIcon: require('../assets/select_xiai.png'),
                            }
                        }
                    }
                },
                {
                    stack: {
                        id: 'HOME_TABS',
                        children: [
                            {
                                component: {
                                    id: 'BEI_RUN_SCREEN',
                                    name: 'BeiRun'
                                }
                            }
                        ],
                        options: {
                            bottomTab: {
                                text: '发布',
                                icon: require('../assets/lightfill.png'),
                                selectedIcon: require('../assets/select_lightfill.png'),
                            }
                        }
                    }
                },
                {
                    stack: {
                        id: 'HOME_TABS',
                        children: [
                            {
                                component: {
                                    id: 'My',
                                    name: 'My'
                                }
                            }
                        ],
                        options: {
                            bottomTab: {
                                text: '我的',
                                icon: require('../assets/my.png'),
                                selectedIcon: require('../assets/select_my.png'),
                            }
                        }
                    }
                },
            ]
        }
    }
}

// 默认配置
Navigation.setDefaultOptions({
    bottomTabs: {
        titleDisplayMode: 'alwaysShow'
    },
    statusBar: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        style: 'dark',
        visible: true,
    },
    topBar: {
        title: {
            color: 'black',
        },
        backButton: {
            color: '#666666',
        },
        background: {
            color: '#ffffff',
        },
    },
    bottomTab: {
        fontSize: 12,
        selectedFontSize: 14,
        iconWidth: 20,
        iconWidth: 20,
        textColor: '#666666',
        selectedTextColor: '#0099FF',
        fontWeight: "bold",
    },
})