import React from 'react'
import { useBasket } from '../../contexts/BasketContext'
import { Alert, Box, Button, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Basket() {
    const { removeFromBasket, items } = useBasket()

    const total = items.reduce((acc, obj) => acc + obj.price, 0)

    return (
        <Box p={'5'}>
            {
                items.length < 1
                    ? <Alert status='warning'> You have not any items in your basket</Alert>
                    : <ul style={{ listStyle: 'decimal' }}>
                        {items.map((item) => (
                            <li key={item._id} style={{ marginBottom: 20 }}>
                                <Link to={`/product/${item._id}`}>
                                    <Text fontSize={'18'}>
                                        {item.title} - {item.price} ₺

                                    </Text>
                                    <Image
                                        htmlWidth={200}
                                        loading='lazy'
                                        src={item.photos[0]}
                                        alt='basket item'
                                    />
                                </Link>
                                <Button mt={'2'} size={'sm'} colorScheme='pink' onClick={() => removeFromBasket(item._id)}>
                                    Remove from basket
                                </Button>
                            </li>
                        ))}
                    </ul>
            }
            <Box mt={'10'}>
                <Text fontSize={'22'}>
                    Total :{total} ₺
                </Text>
            </Box>
        </Box>
    )
}

export default Basket