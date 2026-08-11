import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();
  // 2. While loading show the spinner
  if (isLoading) {
    return (
      <FullPage>
        {" "}
        <Spinner />{" "}
      </FullPage>
    );
  }
  // 3. If there is NO authenticated user, then redirect to login page
  if (!isAuthenticated) {
    navigate("/login", { replace: true });
  }
  // 4. If there IS user, render the app

  if (isAuthenticated) return children;
}
