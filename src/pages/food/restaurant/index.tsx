// @ts-nocheck
import type { Restaurant } from '@/api/restaurant';
import { getAllRestaurants } from '@/api/restaurant';
import { PlusOutlined } from '@ant-design/icons';
import ProDescriptions from '@ant-design/pro-descriptions';
import { ModalForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Drawer, message, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: Restaurant) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType, currentRow?: Restaurant) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: Restaurant[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<Restaurant>();
  const [selectedRowsState, setSelectedRows] = useState<Restaurant[]>([]);
  /** 国际化配置 */

  const columns: ProColumns<Restaurant>[] = [
    {
      title: '#',
      dataIndex: 'id',
      render: (_, __, index) => index,
    },
    {
      title: 'Compony Name',
      dataIndex: 'componyName',
      valueType: 'textarea',
    },
    {
      title: 'Restaurant',
      dataIndex: 'restaurant',
      renderText: (_, record) => {
        return (
          <div>
            <span>{record.name}</span>
            <span>{record.address.address}</span>
          </div>
        );
      },
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      renderText: (_, record) => (
        <div>
          <span>{record.phone}</span>
          <span>{record.email}</span>
        </div>
      ),
    },
    {
      title: 'Tax Rate',
      dataIndex: 'taxRate',
      renderText: (val: Restaurant['taxRate']) => <div>{val}</div>,
    },
    {
      title: 'Timezone',
      dataIndex: 'timezone',
      renderText: (val: Restaurant['timezone']) => <div>{val}</div>,
    },
    {
      title: 'Active',
      dataIndex: 'active',
      renderText: (val: boolean) =>
        val ? <Tag color={'green'}>Yes</Tag> : <Tag color={'red'}>No</Tag>,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
  ];

  return (
    <PageContainer>
      <ProTable<Restaurant>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              setShowDetail(true);
              setCurrentRow(record);
            },
          };
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async () => {
          // TODO
          try {
            const result = await getAllRestaurants({});
            if (!result.success) {
              throw new Error(result.message);
            }

            return {
              data: result.foodRestaurants,
            };
          } catch (e) {
            message.error('请求失败，请重试');
            throw e;
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <ModalForm
        title="Create Restaurant"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as Restaurant);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        {[
          { label: 'Compony Name', name: 'componyName' },
          { label: 'Restaurant Name', name: 'restaurantName' },
          { label: 'Restaurant Address', name: 'restaurantAddress' },
          { label: 'Contact Tel', name: 'contactTel' },
          { label: 'Contact Email', name: 'contactEmail' },
          { label: 'Tax Rate', name: 'taxRate' },
          { label: 'Timezone', name: 'timezone' },
        ].map((item) => {
          return (
            <ProFormText
              key={item.name}
              rules={[
                {
                  required: true,
                  message: '规则名称为必填项',
                },
              ]}
              placeholder={item.label}
              label={item.label}
              name={item.name}
              width="md"
            />
          );
        })}

        <ProFormCheckbox width="md" name="active">
          Company Active
        </ProFormCheckbox>
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value, currentRow);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow!}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<Restaurant>
            column={1}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns.filter((c) => c.dataIndex !== 'option')}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
