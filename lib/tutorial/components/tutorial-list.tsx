import { LinkCard } from "@/components";
import { TutorialListing, TutorialTag } from "@pages/tutorials/list";

export const TutorialList = ({
  tutorials,
  tags,
}: {
  tutorials: readonly TutorialListing[];
  tags?: readonly TutorialTag[];
}) => {
  let filtered = tutorials;
  if (tags) {
    const includedTags = new Set(tags);
    filtered = filtered.filter((tutorial) =>
      tutorial.tags.some((tag) => includedTags.has(tag)),
    );
  }

  return (
    <ul>
      {filtered.map((listing) => (
        <li key={listing.id}>
          <LinkCard link={`/tutorials/${listing.link}`} label={listing.label}>
            {listing.blurb}
          </LinkCard>
        </li>
      ))}
    </ul>
  );
};
