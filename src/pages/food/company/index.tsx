import type { FoodCompany } from '@/api/company';
import { createCompany, getAllCompany, updateCompany } from '@/api/company';
import { PlusOutlined } from '@ant-design/icons';
import ProDescriptions from '@ant-design/pro-descriptions';
import { ModalForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Drawer, message, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage } from 'umi';
/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: FoodCompany) => {
  const hide = message.loading('正在添加');

  try {
    const result = await createCompany({ ...fields });

    if (!result.success) {
      throw new Error(result.message);
    }

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

const handleUpdate = async (fields: FoodCompany, currentRow: FoodCompany) => {
  const hide = message.loading('正在修改');

  try {
    const result = await updateCompany({
      ...fields,
      id: currentRow.id,
    });

    if (!result.success) {
      throw new Error(result.message);
    }

    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: FoodCompany[]) => {
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
  const [currentRow, setCurrentRow] = useState<FoodCompany | undefined>();
  const [selectedRowsState, setSelectedRows] = useState<FoodCompany[]>([]);
  /** 国际化更新 */

  const columns: ProColumns<FoodCompany>[] = [
    {
      title: '#',
      dataIndex: 'id',
      render: (_, __, index) => index,
    },
    {
      title: 'Company Name',
      dataIndex: 'name',
      valueType: 'textarea',
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
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={(e) => {
            e.stopPropagation();
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<FoodCompany>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
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
            const result = await getAllCompany({});
            if (!result.success) {
              throw new Error(result.message);
            }

            return {
              data: result.foodCompanies,
            };
          } catch (e) {
            message.error('请求失败，请重试');
            throw e;
          }
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              setShowDetail(true);
              setCurrentRow(record);
            },
          };
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
        title="Create Company"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as FoodCompany);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          placeholder="Company Name"
          name="name"
          width="md"
        />
        <ProFormCheckbox width="md" name="active" initialValue={false}>
          Company Active
        </ProFormCheckbox>
      </ModalForm>

      {/* <UpdateForm
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
      /> */}

      <ModalForm
        title="Update Company"
        width="400px"
        visible={updateModalVisible}
        onVisibleChange={handleUpdateModalVisible}
        onFinish={async (value) => {
          const success = await handleUpdate(
            value as FoodCompany,
            (currentRow || {}) as FoodCompany,
          );
          if (success) {
            handleUpdateModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        initialValues={currentRow}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          placeholder="Company Name"
          name="name"
          width="md"
        />
        <ProFormCheckbox width="md" name="active" initialValue={false}>
          Company Active
        </ProFormCheckbox>
      </ModalForm>

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
          <ProDescriptions<FoodCompany>
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
