import styled from "styled-components"

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5em;

  .left-side {
    display: flex;
    gap: 1em;
    align-items: center;

    @media (max-width: 768px) {
      a:first-child {
        ~ * {
          display: none;
        }
      }
    }

    a {
      text-decoration: none;
      color: #ff8c00;
      font-size: 14pt;

      &:hover {
        @media (min-width: 768px) {
          opacity: 0.5;
        }
      }
    }
  }

  .right-side {
    position: relative;
    display: flex;
    justify-content: space-between;

    .desktop-links {
      display: flex;
      gap: 1em;
      align-items: center;

      @media (max-width: 768px) {
        display: none;
      }

      a {
        text-decoration: none;
        color: #ff8c00;
        font-size: 14pt;

        &:hover {
          @media (min-width: 768px) {
            opacity: 0.5;
          }
        }
      }

      .search-icon {
        float: right;
        cursor: pointer;
        display: flex;

        align-items: center;

        &:hover {
          @media (min-width: 768px) {
            opacity: 0.5;
          }
        }
      }
    }

    .mobile-links {
      @media (min-width: 768px) {
        display: none;
      }
    }
  }
`

export const Dropdown = styled.div`
  display: none;
  margin-top: -1px;

  @media (max-width: 768px) {
    display: none;
    justify-content: center;
    gap: 1em;
    right: 0;
    position: absolute;
    width: 100%;
    background: #212529;
    padding-bottom: 1em;
  }

  div:last-child {
    color: #ff8c00;
    font-size: 14pt;
  }

  a {
    text-decoration: none;
    color: #ff8c00;
    font-size: 14pt;
  }
`