import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { fetchOrders } from '../../../api'
import { Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'

function AdminOrders() {

  const { isLoading, error, data } = useQuery({
    queryKey: ['admin:orders'],
    queryFn: fetchOrders
  })

  if (isLoading) {
    return <div>Loading....</div>
  }

  if (error) {
    return <div>Error.... {error.message}</div>
  }

  console.log(data)
  return (
    <div>
      <Text fontSize={'22'}>Orders </Text>
      <Table variant={'simple'}>
        <TableCaption>Orders Tablosu</TableCaption>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Address</Th>
            <Th>Items</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            data.map((item) => (
 
              <Tr key={item._id}>
                <Td>{item.user.email}</Td>
                <Td>{item.adress}</Td>
                <Td isNumeric={true}>{item.items.length}</Td>
              </Tr>

            ))
          }
        </Tbody>

      </Table>
    </div>
  )
}

export default AdminOrders