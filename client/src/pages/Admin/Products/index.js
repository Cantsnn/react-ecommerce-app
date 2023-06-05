import React, { useMemo } from 'react'
import { deleteProduct, fetchProductList } from '../../../api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Flex, Text } from '@chakra-ui/react'
import { Popconfirm, Table } from 'antd'
import { Link } from 'react-router-dom'
function AdminProducts() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['admin:products'],
    queryFn: fetchProductList
  })


  const queryCilent = useQueryClient()

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryCilent.invalidateQueries('admin:products')
  })

  const handleDelete = (product_id) => {
    deleteMutation.mutate(product_id)
    alert("The product was successfully deleted")

  }

  const columns = useMemo(() => {

    return [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt'
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>
              <Button>Edit</Button>
            </Link>
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => handleDelete(record._id)}
              onCancel={() => console.log('İptal Edildi')}
              okText='Yes'
              cancelText='No'
              placement='left'
              okButtonProps={{ danger: true }} // Popconfirm içindeki düğmeyi kırmızı renkte göstermek için
              cancelButtonProps={{ danger: false }}

            >
              <Button type="link" style={{ marginLeft: 10 }}>Delete</Button>
            </Popconfirm>
          </>
        )
      }
    ]
  }, [])


  if (isLoading) {
    return <div>Loading....</div>
  }

  if (error) {
    return <div>Error.... {error.message}</div>
  }


  return (
    <div>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text fontSize={'2xl'} p={'5'}>Products</Text>
        <Link to={'/admin/products/new'}>
          <Button colorScheme='green'>New</Button>

        </Link>
      </Flex>
      <Table dataSource={data} columns={columns} rowKey={'_id'} />
    </div>
  )
}

export default AdminProducts