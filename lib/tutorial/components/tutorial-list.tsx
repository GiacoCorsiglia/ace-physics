import { LinkCard } from "@/components";
import { TutorialListing } from "@pages/tutorials/list";

export const TutorialList = ({
  tutorials,
}: {
  tutorials: readonly TutorialListing[];
}) => (
  <ul>
    {tutorials.map((listing) => (
      <li key={listing.id}>
        <LinkCard link={`/tutorials/${listing.id}`} label={listing.label}>
          {listing.blurb}
        </LinkCard>
      </li>
    ))}
  </ul>
);
