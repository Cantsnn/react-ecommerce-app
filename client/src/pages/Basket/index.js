import React, { useRef, useState } from 'react'
import { useBasket } from '../../contexts/BasketContext'
import { Alert, Box, Button, FormControl, FormLabel, Image, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { postOrder } from '../../api'

function Basket() {

    const [address, setAddress] = useState('')
    const { removeFromBasket, items, emptyBasket } = useBasket()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef()
    const finalRef = useRef()
    const total = items.reduce((acc, obj) => acc + obj.price, 0)


    const handleSubmitForm = async () => {
        const itemdIds = items.map((item) => item._id)

        const input = {
            address,
            items: JSON.stringify(itemdIds)
        }

        const response = await postOrder(input)

        emptyBasket()
        onClose()
        console.log(response)
    }

    return (
        <Box p={'5'}>
            {
                items.length < 1
                    ? <Alert status='warning'> You have not any items in your basket</Alert>
                    : <><ul style={{ listStyle: 'decimal' }}>
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
                        <Box mt={'10'}>
                            <Text fontSize={'22'}>
                                Total :{total} ₺
                            </Text>
                        </Box>
                        <Button mt={'2'} size={'sm'} colorScheme='green'
                            onClick={onOpen}


                        >
                            Order
                        </Button>
                    </>
            }


            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Order</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Textarea ref={initialRef}
                                placeholder='Address'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmitForm}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default Basket