import {
  Box,
  Button,
  Card,
  Center,
  CloseButton,
  Container,
  Flex,
  Grid,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core"
import { FormEvent } from "react"
import { trpc } from "~/server/utils/trpc"

type toggleFavoriteType = {
  bookId: string
  isFavorite: boolean
}

export default function Home() {
  const { data: books, refetch } = trpc.book.get.useQuery({ isFavorite: false })
  const { data: favoriteBook, refetch: favoriteFetch } = trpc.book.get.useQuery(
    { isFavorite: true },
  )
  const insertMutation = trpc.book.create.useMutation({
    onSuccess() {
      refetch()
    },
  })
  const deleteMutation = trpc.book.delete.useMutation({
    onSuccess() {
      refetch()
    },
  })
  const favoriteMutation = trpc.book.updateFavorite.useMutation({
    onSuccess() {
      refetch()
      favoriteFetch()
    },
  })

  function deleteBook(bookId: string) {
    const isConfirm = confirm("are you sure?")
    if (!isConfirm) return
    deleteMutation.mutate({ bookId })
  }

  function toggleFavorite({ bookId, isFavorite }: toggleFavoriteType) {
    favoriteMutation.mutate({ bookId, isFavorite })
  }

  function handleForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    const data = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      description: formData.get("description") as string,
    }

    insertMutation.mutate(data)
    e.currentTarget.reset()
  }

  return (
    <Box bg="gray.0">
      <Container py="lg">
        <Title size="h2" py="md" align="center" color="violet.6">
          BookShelf
        </Title>
        <Grid justify="center">
          {/* Form */}
          <Grid.Col>
            <Box component="form" onSubmit={handleForm} bg="white" p="lg">
              <TextInput
                placeholder="Title..."
                label="Title"
                name="title"
                required
                withAsterisk
              />
              <TextInput
                placeholder="Author..."
                label="Author"
                py="md"
                name="author"
                required
                withAsterisk
              />
              <Textarea
                placeholder="Description..."
                label="Description"
                name="description"
                required
                withAsterisk
              />
              <Center pt="md">
                <Button color="violet.6" radius="lg" type="submit">
                  Add Book
                </Button>
              </Center>
            </Box>
          </Grid.Col>
        </Grid>
        {/* List book */}
        <Title size="h2" py="md">
          List Book
        </Title>
        <Grid py="lg">
          {books?.data.map((book) => (
            <Grid.Col key={book.id} sm={6} lg={4}>
              <Card shadow="md" p="lg" radius="md" pos="relative">
                <CloseButton
                  title="delete book"
                  pos="absolute"
                  top={4}
                  right={8}
                  iconSize={20}
                  onClick={() => deleteBook(book.id)}
                />
                <Title size="h3" pb="md">
                  {book.title}
                </Title>
                <Text size="md" pb="xs" italic>
                  {book.author}
                </Text>
                <Text lineClamp={4} mb="md">
                  {book.description}
                </Text>
                <Flex justify="flex-end">
                  <Button
                    color="pink.6"
                    radius="md"
                    onClick={() => {
                      toggleFavorite({
                        bookId: book.id,
                        isFavorite: !book.isFavorite,
                      })
                    }}
                  >
                    Favorite
                  </Button>
                </Flex>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
        {/* Favorite book */}
        <Title size="h2" py="md">
          Favorite Book
        </Title>
        <Grid py="lg">
          {favoriteBook?.data.map((book) => (
            <Grid.Col key={book.id} sm={6} lg={4}>
              <Card shadow="md" p="lg" radius="md" pos="relative">
                <Title size="h3" pb="md">
                  {book.title}
                </Title>
                <Text size="md" pb="xs" italic>
                  {book.author}
                </Text>
                <Text lineClamp={4} mb="md">
                  {book.description}
                </Text>
                <Flex justify="flex-end">
                  <Button
                    color="pink.6"
                    radius="md"
                    onClick={() => {
                      toggleFavorite({
                        bookId: book.id,
                        isFavorite: !book.isFavorite,
                      })
                    }}
                  >
                    unFavorite
                  </Button>
                </Flex>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
