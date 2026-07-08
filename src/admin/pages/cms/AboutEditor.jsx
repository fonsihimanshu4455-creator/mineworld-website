import { PageHeader } from "../Dashboard";
import TextEditor from "../../components/TextEditor";
import ToggleEditor from "../../components/ToggleEditor";
import EditorSection from "../../components/EditorSection";

export default function AboutEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · About"
        title="About Page"
        subtitle="The three impersonal content sections on /about — Mission, Pillars, and Impact numbers. Each has its own show/hide toggle. Founder + Team have their own editor pages."
      />

      {/* ─── Mission ─── */}
      <EditorSection
        title="Mission section"
        hint="Big centred pull-quote at the top of the About page."
      >
        <ToggleEditor
          slotKey="about.show_mission"
          label="Show Mission section on the website"
        />
        <TextEditor
          slotKey="about.mission_eyebrow"
          label="Eyebrow (small line above the headline)"
          fallback="Mission"
        />
        <TextEditor
          slotKey="about.mission_headline"
          label="Headline"
          multiline
          fallback="We build for perception, not for reach."
        />
        <TextEditor
          slotKey="about.mission_body"
          label="Body paragraph"
          multiline
          fallback="Every reel, ad, and pixel that leaves the studio is calibrated to a single question — does it make the right person stop scrolling and start trusting? If yes, ship it. If not, cut it. That standard is the whole point of Mineworld."
        />
      </EditorSection>

      {/* ─── Pillars ─── */}
      <EditorSection
        title="Pillars section"
        hint="Three how-we-work cards (Editing-first · Growth as the metric · Premium standard)."
      >
        <ToggleEditor
          slotKey="about.show_pillars"
          label="Show Pillars section on the website"
        />
        <TextEditor
          slotKey="about.pillars_eyebrow"
          label="Eyebrow"
          fallback="How we work"
        />
        <TextEditor
          slotKey="about.pillars_headline"
          label="Headline"
          multiline
          fallback="Three standards. Every project. No shortcuts."
        />
        <TextEditor
          slotKey="about.pillars_subhead"
          label="Sub-paragraph"
          multiline
          fallback="We hold every deliverable to the same three questions — before it ships."
        />
      </EditorSection>

      {/* ─── Impact ─── */}
      <EditorSection
        title="Impact / Numbers band"
        hint="Navy band with the four highlight stats at the bottom of the About page."
      >
        <ToggleEditor
          slotKey="about.show_impact"
          label="Show Impact section on the website"
        />
        <TextEditor
          slotKey="about.impact_eyebrow"
          label="Eyebrow"
          fallback="Proof"
        />
        <TextEditor
          slotKey="about.impact_headline"
          label="Headline"
          multiline
          fallback="Numbers behind the standard."
        />
        <TextEditor
          slotKey="about.impact_subhead"
          label="Sub-paragraph"
          multiline
          fallback="Selected outcomes from live client work — everything measured, everything moves the P&L."
        />
      </EditorSection>
    </div>
  );
}
