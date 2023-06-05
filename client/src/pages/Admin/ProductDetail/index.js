import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { fetchProduct, updateProduct } from '../../../api'
import { Box, Button, FormControl, FormLabel, Input, Text, Textarea } from '@chakra-ui/react'
import { FieldArray, Formik } from 'formik'
import editScheme from './validations'
import { message } from 'antd'


function AdminProductDetail() {

    const { product_id } = useParams()

    const { isLoading, error, data } = useQuery({
        queryKey: ['admin:product', product_id],
        queryFn: () => fetchProduct(product_id)
    })
    const queryClient = useQueryClient()

    if (isLoading) {
        return <div>Loading....</div>
    }

    if (error) {
        return <div>Error....</div>
    }


    const handleSubmit = async (values, bag) => {
        console.log("submit")
        message.loading({ content: 'Loading...', key: 'product_update' })

        try {
            await updateProduct(values, product_id)
            message.success({
                content: 'The product succesfully updated',
                key: 'product_update',
                duration: 2
            })
            queryClient.invalidateQueries('products');
        } catch (e) {
            message.error('The product does not updated')
        }

    }

    return (
        <div>
            <Text fontSize={'2xl'}>Edit</Text>
            <Formik initialValues={
                {
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    photos: data.photos
                }
            }
                validationSchema={editScheme}
                onSubmit={handleSubmit}>
                {
                    (
                        {
                            handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting
                        }
                    ) => (
                        <>
                            <Box>
                                <Box my={'5'} textAlign={'left'}>
                                    <form onSubmit={handleSubmit}>
                                        <FormControl>
                                            <FormLabel> Label </FormLabel>
                                            <Input
                                                name='title'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.title}
                                                disabled={isSubmitting}
                                                isInvalid={touched.title && errors.title} />
                                            {touched.title && errors.title && (
                                                <Text color='red.500'>{errors.title}</Text>
                                            )}
                                        </FormControl>
                                        <FormControl mt={'4'}>
                                            <FormLabel> Description </FormLabel>
                                            <Textarea
                                                name='description'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.description}
                                                disabled={isSubmitting}
                                                isInvalid={touched.description && errors.description} />
                                            {touched.description && errors.description && (
                                                <Text color='red.500'>{errors.description}</Text>
                                            )}
                                        </FormControl>
                                        <FormControl mt={'4'}>
                                            <FormLabel> Price </FormLabel>
                                            <Input
                                                name='price'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.price}
                                                disabled={isSubmitting}
                                                isInvalid={touched.price && errors.price} />
                                            {touched.price && errors.price && (
                                                <Text color='red.500'>{errors.price}</Text>
                                            )}
                                        </FormControl>
                                        <FormControl mt={'4'}>
                                            <FormLabel> Photos </FormLabel>
                                            <FieldArray
                                                name='photos'
                                                render={
                                                    (arrayHelpers) => (
                                                        <div>
                                                            {
                                                                values.photos &&
                                                                values.photos.map((photo, index) => (
                                                                    <div key={index}>
                                                                        <Input
                                                                            name={`photos.${index}`}
                                                                            value={photo}
                                                                            disabled={isSubmitting}
                                                                            onChange={handleChange}
                                                                            width={'3xl'}
                                                                        />
                                                                        <Button ml={'4'}
                                                                            type='button'
                                                                            colorScheme={'red'}
                                                                            onClick={() => arrayHelpers.remove(index)}>
                                                                            Remove
                                                                        </Button>
                                                                    </div>

                                                                ))
                                                            }
                                                            <Button mt={'5'} onClick={() => arrayHelpers.push('')} >
                                                                Add a photo
                                                            </Button>
                                                        </div>
                                                    )
                                                }

                                            />
                                        </FormControl>

                                        <Button mt={'4'} width={'full'} type='submit' isLoading={isSubmitting} >Update</Button>
                                    </form>
                                </Box>
                            </Box>
                        </>
                    )
                }
            </Formik>
        </div>
    )
}

export default AdminProductDetail