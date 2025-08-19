import { Container } from "@mui/material";
import NextBreadcrumbs from "@/components/ui/Breadcrumb";
import { MatchesCard } from "@/components/matches/MatchesCard";

export default function MatchesPage() {
  const matches = [
    {
      _id: "1",
      date: "2024-12-31T17:00:00.000+00:00",
      opponent: "FC Number One",
      stadium: "Dam Hong 1",
      summary: "Một trận đấu tốt của anh em",
      status: "FINISH",
      images: [""], // mảng chứa 1 chuỗi rỗng
      opponent_avatar: "",
      opponent_goal: 2,
      opponent_scorer: [
        {
          name: "Vu Duy Phong",
          number_of_goal: 1,
        },
      ],
      our_goal: 2,
      our_scorer: [
        {
          fullname: "Hieu Banana",
          number_of_goal: 2,
        },
      ],
    },
    {
      _id: "2",
      date: "2024-12-31T17:00:00.000+00:00",
      opponent: "FC Number One",
      stadium: "Dam Hong 1",
      summary: "Một trận đấu tốt của anh em",
      status: "FINISH",
      images: [""], // mảng chứa 1 chuỗi rỗng
      opponent_avatar: "",
      opponent_goal: 1,
      opponent_scorer: [
        {
          name: "Vu Duy Phong",
          number_of_goal: 1,
        },
      ],
      our_goal: 2,
      our_scorer: [
        {
          fullname: "Hieu Banana",
          number_of_goal: 2,
        },
      ],
    },
  ];

  return (
    <Container maxWidth="lg">
      <Container>
        <NextBreadcrumbs />
        <h1>Lịch thi đấu & Kết quả</h1>
        <MatchesCard matchesData={matches} />
      </Container>
    </Container>
  );
}
