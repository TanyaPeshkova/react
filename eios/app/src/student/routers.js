import ProfilePage from "./pages/ProfilePage";
import ProgramsPage from "./pages/ProgramsPage";
import EorPage from "./pages/EorPage";
import EuiPage from "./pages/EuiPage";
import ControlPointsPage from "./pages/ControlPointsPage";
import MarksPage from "./pages/MarksPage";
import CompetencePage from "./pages/CompetencePage";
import LibPage from "./pages/LibPage";
import PlanPage from "./pages/PlanPage";

export const routers = {
    path: "/students",
    name: "Профиль",
    Component: ProfilePage,
    children: [
        {
            path: "/profile",
            name: "Профиль",
            Component: ProfilePage
        }, {
            path: "/docs",
            name: "Рабочие программы учебных дисциплин, практик",
            Component: ProgramsPage
        }, {
            path: "/eor",
            name: "Электронные образовательные ресурсы, указанные в рабочих программах",
            Component: EorPage
        }, {
            path: "/eui",
            name: "Электронные учебные издания, указанные в рабочих программах",
            Component: EuiPage
        }, {
            path: "/kt",
            name: "Ход образовательного процесса",
            Component: ControlPointsPage
        }, {
            path: "/marks",
            name: "Результаты промежуточной аттестации",
            Component: MarksPage
        }, /*{
            path: "/competence",
            name: "Результаты освоения программы",
            Component: CompetencePage
        }, {
            path: "/lib",
            name: "Электронные библиотечные системы",
            Component: LibPage
        },*{
            path: "/plan",
            name: "Учебный план",
            Component: PlanPage
        }*/
    ]
};