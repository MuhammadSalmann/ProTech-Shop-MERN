import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from "react-bootstrap"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetUsersQuery, useDeleteUserMutation } from "../../slices/usersApiSlice"
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa"
import { toast } from 'react-toastify'

const UserListScreen = () => {
  const { data: users, refetch, isLoading, isError } = useGetUsersQuery()
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation()
  
  const deleteHandler = async (id) => {
    if(window.confirm('Are you sure?')) {
        try {
            await deleteUser(id)
            toast.success('User Deleted')
            refetch();
        } catch(err) {
            toast.error(err?.data?.message || err.error)
        }
    }
  }

  return (
    <>
      <h1>Users</h1>
      {isLoadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{isError}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a> </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                        <FaTrash style={{color: 'white'}} />
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen