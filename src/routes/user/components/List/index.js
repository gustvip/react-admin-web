/**
 * Created by joey on 2018/2/18
 */

/**
 * 基本
 */
import T from 'utils/T'
import * as actionTypes from '../../actions/list'
import style from './list.scss'

/**
 * 组件
 */
import { Button, Input } from 'antd'
import { Link } from 'react-router-dom'
import { MainHeader, MainContent } from 'templates/MainLayout'
import Table from 'templates/ToolComponents/Table'

/**
 * 枚举
 */
import EnumRouter from 'constants/EnumRouter'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'

/**
 * 入口组件
 */
@T.decorator.contextTypes('router')
export default class List extends React.PureComponent {
  /**
   * 获取用户所有信息
   */
  componentDidMount () {
    this.props.dispatch(actionTypes.getInitialDataAction({
      currentPage: this.props.mapProps.currentPage,
      pageSize: this.props.mapProps.pageSize,
    }))
  }
  
  /**
   * 删除相关用户
   * @param {Number || Array} user_id
   */
  handleDelete = user_id => {
    const userId = []
    const _this = this
    /**
     * user_id是数字的逻辑处理
     * user_id是数组的逻辑处理
     */
    if (T.helper.isUsefulNumber(user_id)) {
      userId.push(user_id)
    } else if (T.helper.checkArray(user_id)) {
      user_id.forEach(item => {
        userId.push(_this.props.mapProps.dataSource[item].user_id)
      })
    }
    
    T.helper.checkArray(userId) && _this.props.dispatch(actionTypes.deleteUserAction({
      user_id: userId,
      currentPage: _this.props.mapProps.currentPage,
      pageSize: _this.props.mapProps.pageSize,
    }))
  }
  
  /**
   * 选中行
   * @param {Array} selectedRowKeys
   */
  handleSelectedRowKeys = selectedRowKeys => {
    this.props.dispatch(actionTypes.setDeleteRowAction(selectedRowKeys))
  }
  
  /**
   * 选中行
   * @param {String} value
   */
  handleSearch = value => {
    const _this = this
    _this.props.dispatch(actionTypes.setUserSearchAction({
      userInfo: value,
      limitLength: _this.props.mapProps.pageSize,
    }))
  }
  
  /**
   * 获取表格配置
   * @returns {*[]}
   */
  get columns () {
    const _this = this
    
    return [
      {
        title: 'id',
        dataIndex: 'user_id',
        sorter (a, b) {
          return T.helper.sort({
            prev: a,
            now: b,
            property: 'user_id',
          })
        },
      },
      {
        title: '名称',
        dataIndex: 'user_name',
        sorter (a, b) {
          return T.helper.sort({
            prev: a,
            now: b,
            property: 'user_name',
          })
        },
      },
      {
        title: '邮箱',
        dataIndex: 'user_email',
        sorter (a, b) {
          return T.helper.sort({
            prev: a,
            now: b,
            property: 'user_email',
          })
        },
      },
      {
        title: '电话',
        dataIndex: 'user_phone',
        sorter (a, b) {
          return T.helper.sort({
            prev: a,
            now: b,
            property: 'user_phone',
          })
        },
      },
      {
        title: '状态',
        dataIndex: 'delete_status',
        sorter (a, b) {
          return T.helper.sort({
            prev: a,
            now: b,
            property: 'user_status',
          })
        },
      },
      {
        title: '用户类型',
        dataIndex: 'user_type',
        sorter (a, b) {
          return T.helper.sort({
            prev: a,
            now: b,
            property: 'user_type',
          })
        },
      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        render: val => T.helper.formatDate(val),
        sorter (a, b) {
          return T.helper.sort({
            prev: a,
            now: b,
            property: 'created_at',
          })
        },
      },
      {
        title: '更新时间',
        dataIndex: 'updated_at',
        render: val => T.helper.formatDate(val),
        sorter (a, b) {
          return T.helper.sort({
            prev: a,
            now: b,
            property: 'updated_at',
          })
        },
      },
      {
        title: '操作',
        dataIndex: '',
        render: (val, row) => {
          return (
            <div>
              <Button
                type="primary"
                onClick={() => _this.handleDelete(row.user_id)}
              >
                删除
              </Button>
              <Link
                to={{
                  pathname: EnumRouter.user_edit,
                  state: {
                    user_id: row.user_id,
                  },
                }}
              >
                <Button
                  type="primary"
                >
                  编辑
                </Button>
              </Link>
              <Link
                to={{
                  pathname: EnumRouter.order_add,
                  state: {
                    user_id: row.user_id,
                  },
                }}
              >
                <Button
                  type="primary"
                >
                  新增订单
                </Button>
              </Link>
            </div>
          )
        },
      },
    ]
  }
  
  /**
   * 获取表格数据
   */
  get dataSource () {
    return this.props.mapProps.dataSource.map((item, index) => ({
      ...item,
      key: index,
    }))
  }
  
  /**
   * 分页
   * @returns {{current: *, total: ((key?: (IDBKeyRange | IDBValidKey)) => IDBRequest) | ((countTitle?: string) => void), pageSize: *, showQuickJumper: boolean, onChange(*=, *=): void}}
   */
  get pagination () {
    const _this = this
    
    return {
      current: _this.props.mapProps.currentPage,
      total: _this.props.mapProps.count,
      pageSize: _this.props.mapProps.pageSize,
      showQuickJumper: true,
      onChange (currentPage, pageSize) {
        _this.props.dispatch(actionTypes.getUserListAction({currentPage, pageSize}))
      },
    }
  };
  
  /**
   * 行选中
   * @return {*}
   */
  get rowSelection () {
    const _this = this
    
    return {
      selectedRowKeys: _this.props.mapProps.selectedRowKeys,
      onChange (selectedRowKeys) {
        return _this.handleSelectedRowKeys(selectedRowKeys)
      },
    }
  };
  
  render () {
    const _this = this
    
    return <div id={style['main-container']}>
      <MainHeader title="content-header"/>
      <MainContent className={style['main-content-container']}>
        <header className={style['table-header-container']}>
          <div className={style['left-container']}>
            <Button
              type="primary"
              onClick={() => _this.handleDelete(_this.props.mapProps.selectedRowKeys)}
            >
              删除
            </Button>
          </div>
          <div className={style['right-container']}>
            <Input placeholder="请搜索" onChange={e => _this.handleSearch(e.target.value)}/>
          </div>
        </header>
        <Table
          dataSource={_this.dataSource}
          columns={_this.columns}
          pagination={_this.pagination}
          rowSelection={_this.rowSelection}
        />
      </MainContent>
    </div>
  }
}
