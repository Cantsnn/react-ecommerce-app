import { Box, Button, Flex, Grid } from '@chakra-ui/react'
import React from 'react'
import Card from '../../components/Card'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchProductList } from '../../api'


function Products() {

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['products'],
        queryFn: fetchProductList,
        getNextPageParam: (lastGroup, allGroups) => {
            const morePagesExist = lastGroup?.length === 12 //Backenddeki limit ile aynı olması lazım
            
            if(!morePagesExist)
            return

            return allGroups.length + 1
        },
    })

    return status === 'loading' ? (
        <p>Loading...</p>
    ) : status === 'error' ? (
        <p>Error: {error.message}</p>
    ) : (
        <div>
            <Grid templateColumns='repeat(3, 1fr)' gap={5}>
                {
                    data.pages.map((group, i) => (
                        <React.Fragment key={i}>
                            {group.map((item) => (
                                <Box w="100%" key={item._id}>
                                    <Card item={item} />
                                </Box>
                            ))}
                        </React.Fragment>
                    ))
                }

            </Grid>
            <Flex mt="10" justifyContent="center">
                <Button
                    onClick={() => fetchNextPage()}
                    isLoading={isFetchingNextPage}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                            ? 'Load More'
                            : 'Nothing more to load'}
                </Button>

            </Flex>

        </div>
    )
}

export default Products