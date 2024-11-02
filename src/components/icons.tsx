import {
  AlertTriangle,
  ArrowRight,
  BookUser,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  CircuitBoardIcon,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  LayoutDashboardIcon,
  Loader2,
  LogIn,
  LucideIcon,
  LucideProps,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Search,
  Settings,
  SunMedium,
  TicketCheck,
  Trash,
  Twitter,
  User,
  User2Icon,
  UserX2Icon,
  X,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  dashboard: LayoutDashboardIcon,
  logo: TicketCheck,
  login: LogIn,
  calendar: Calendar,
  users: BookUser,
  close: X,
  profile: User2Icon,
  spinner: Loader2,
  search: Search,
  back: ChevronLeft,
  kanban: CircuitBoardIcon,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  employee: UserX2Icon,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  google: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x={0}
      y={0}
      viewBox="0 0 496 512"
      xmlSpace="preserve"
      {...props}
    >
      <g>
        <path
          d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
          style={{}}
          fill="#fbbb00"
          data-original="#fbbb00"
        />
        <path
          d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
          style={{}}
          fill="#518ef8"
          data-original="#518ef8"
        />
        <path
          d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
          style={{}}
          fill="#28b446"
          data-original="#28b446"
        />
        <path
          d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
          style={{}}
          fill="#f14336"
          data-original="#f14336"
          className=""
        />
      </g>
    </svg>
  ),
  twitter: Twitter,
  check: Check,
  cacaoByte: ({ ...props }: LucideProps) => (
    <svg
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="3"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <g>
        <title>Layer 1</title>
        <g stroke="null" id="svg_66">
          <g
            stroke="null"
            transform="matrix(0 -0.849687 0.849687 0 0.751955 30.4185)"
            id="svg_56"
          />
          <g
            stroke="null"
            transform="matrix(0 -0.849687 0.849687 0 10.0895 20.24)"
            id="svg_57"
          />
          <g
            stroke="null"
            transform="matrix(0 -0.849687 0.849687 0 -9.44192 21.0962)"
            id="svg_58"
          />
          <g
            stroke="null"
            transform="matrix(0 -0.849687 0.849687 0 0.883996 10.8362)"
            id="svg_62"
          >
            <rect
              stroke="#e21d48"
              id="svg_7"
              rx="1.5"
              y="6.6528"
              x="3.07825"
              height="3"
              width="8"
            />
            <line
              stroke="#e21d48"
              fill="none"
              id="svg_50"
              y2="0.58145"
              x2="11.0069"
              y1="0.58145"
              x1="3.0069"
            />
          </g>
          <g
            stroke="null"
            transform="matrix(0 -0.849687 0.849687 0 -0.201438 30.506)"
            id="svg_63"
          >
            <rect
              stroke="#e21d48"
              id="svg_5"
              rx="1.5"
              y="12.8411"
              x="13.98136"
              height="3"
              width="8"
            />
            <line
              stroke="#e21d48"
              fill="none"
              id="svg_49"
              y2="21.81999"
              x2="21.97572"
              y1="21.81999"
              x1="13.97572"
            />
          </g>
          <g
            stroke="null"
            transform="matrix(0 -0.849687 0.849687 0 10.1387 21.1145)"
            id="svg_64"
          >
            <rect
              stroke="#f17e92"
              id="svg_1"
              rx="1.5"
              y="1.71402"
              x="14.03255"
              height="8"
              width="3"
            />
            <line
              transform="rotate(90.0678 23.0363 5.72487)"
              stroke="#f17e92"
              fill="none"
              id="svg_52"
              y2="5.72487"
              x2="27.03626"
              y1="5.72487"
              x1="19.03626"
            />
          </g>
          <g
            stroke="null"
            transform="matrix(0 -0.849687 0.849687 0 -9.47822 20.2363)"
            id="svg_65"
          >
            <rect
              stroke="#f17e92"
              id="svg_3"
              rx="1.5"
              y="12.74421"
              x="7.98136"
              height="8"
              width="3"
            />
            <line
              transform="rotate(90 1.97151 16.7484)"
              stroke="#f17e92"
              fill="none"
              id="svg_51"
              y2="16.74842"
              x2="5.97151"
              y1="16.74842"
              x1="-2.02849"
            />
          </g>
        </g>
      </g>
    </svg>
  ),
  cacaoByte2: ({ ...props }: LucideProps) => (
    <svg
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      viewBox="0 0 20 20"
      {...props}
    >
      <g>
        <line
          transform="rotate(90.0678 -1.98955 14.0159) matrix(0.600819 -0.600819 0.600819 0.600819 1.95132 11.1074)"
          x1="7.12941"
          y1="13.53144"
          x2="15.12941"
          y2="13.53144"
          id="svg_52"
          fill="none"
          stroke="#f17e92"
        />
        <line
          transform="rotate(90 -13.9005 33.1997) matrix(0.600819 -0.600819 0.600819 0.600819 -7.79364 18.1894)"
          x1="3.85895"
          y1="14.59855"
          x2="11.85895"
          y2="14.59855"
          id="svg_51"
          fill="none"
          stroke="#f17e92"
        />
        <g
          id="svg_56"
          transform="rotate(45 -0.849543 26.101) matrix(0 -0.849687 0.849687 0 0.751955 30.4185)"
          stroke="null"
        />
        <g
          transform="rotate(45 8.60755 18.6964) matrix(0 -0.849687 0.849687 0 10.0895 20.24)"
          id="svg_57"
          stroke="null"
        />
        <g
          transform="rotate(45 -8.26947 16.6548) matrix(0 -0.849687 0.849687 0 -9.44192 21.0962)"
          id="svg_58"
          stroke="null"
        />
        <rect
          transform="matrix(0.600819 -0.600819 0.600819 0.600819 -1.854 1.9419)"
          width="8"
          height="3"
          x="8.74497"
          y="15.05458"
          rx="1.5"
          id="svg_7"
          stroke="#f17e92"
        />
        <rect
          transform="matrix(0.600819 -0.600819 0.600819 0.600819 -6.92005 19.6995)"
          width="8"
          height="3"
          x="8.53468"
          y="4.45266"
          rx="1.5"
          id="svg_5"
          stroke="#f17e92"
        />
        <rect
          transform="matrix(0.600819 -0.600819 0.600819 0.600819 4.47808 13.2552)"
          width="3"
          height="8"
          x="5.843"
          y="7.61686"
          rx="1.5"
          id="svg_1"
          stroke="#f17e92"
        />
        <rect
          transform="matrix(0.600819 -0.600819 0.600819 0.600819 -13.2741 8.38953)"
          width="3"
          height="8"
          x="16.53991"
          y="7.06601"
          rx="1.5"
          id="svg_3"
          stroke="#f17e92"
        />
        <line
          id="svg_10"
          y2="10.08763"
          x2="18.59457"
          y1="10.02206"
          x1="12.59457"
          stroke-width="2.5"
          stroke="#e21d48"
          fill="none"
        />
        <line
          id="svg_12"
          y2="10.07881"
          x2="7.43822"
          y1="10.01323"
          x1="1.43822"
          stroke-width="2.5"
          stroke="#e21d48"
          fill="none"
        />
        <line
          transform="rotate(90 10.082 4.48549)"
          id="svg_13"
          y2="4.51828"
          x2="13.08197"
          y1="4.45271"
          x1="7.08197"
          stroke-width="2.5"
          stroke="#e21d48"
          fill="none"
        />
        <line
          transform="rotate(90 10.012 15.5586)"
          id="svg_14"
          y2="15.59141"
          x2="13.01199"
          y1="15.52584"
          x1="7.01199"
          stroke-width="2.5"
          stroke="#e21d48"
          fill="none"
        />
      </g>
    </svg>
  ),
}
