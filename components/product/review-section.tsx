"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ChevronDownIcon,
  PenLineIcon,
  StarIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

export interface Review {
  id: number;
  name: string;
  initials: string;
  rating: number;
  title?: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface RatingBreakdownItem {
  stars: number;
  count: number;
}

export interface ReviewSectionProps {
  reviews?: Review[];
  ratingBreakdown?: RatingBreakdownItem[];
  onWriteReview?: () => void;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Emily Carter",
    initials: "EC",
    rating: 5,
    title: "My new everyday drink",
    comment:
      "I love the subtle fruit flavor. It makes drinking water throughout the day so much more enjoyable without being overly sweet.",
    date: "October 18, 2026",
    verified: true,
  },
  {
    id: 2,
    name: "Olivia Bennett",
    initials: "OB",
    rating: 5,
    title: "Refreshing and delicious",
    comment:
      "Peach raspberry is such a refreshing combination. I keep a few bottles in the fridge at all times.",
    date: "October 15, 2026",
    verified: true,
  },
  {
    id: 3,
    name: "James Wilson",
    initials: "JW",
    rating: 4,
    title: "Light fruit flavor",
    comment:
      "A nice alternative to plain water when I want a little flavor. I especially enjoy drinking it chilled.",
    date: "October 12, 2026",
    verified: true,
  },
  {
    id: 4,
    name: "Sophia Miller",
    initials: "SM",
    rating: 5,
    title: "Perfect for my desk",
    comment:
      "I keep a bottle at my desk every day. The flavor is light, and it fits perfectly into my daily routine.",
    date: "October 9, 2026",
    verified: true,
  },
  {
    id: 5,
    name: "Noah Davis",
    initials: "ND",
    rating: 4,
    title: "A nice change",
    comment:
      "Enjoyable fruit flavor without the sweetness of a typical flavored drink. Would happily order it again.",
    date: "October 6, 2026",
    verified: true,
  },
  {
    id: 6,
    name: "Ava Thompson",
    initials: "AT",
    rating: 5,
    title: "Love the simplicity",
    comment:
      "Simple, refreshing, and easy to enjoy with lunch or after a workout. One of my favorite flavored waters.",
    date: "October 3, 2026",
    verified: true,
  },
];

const DEFAULT_RATING_BREAKDOWN: RatingBreakdownItem[] = [
  { stars: 5, count: 42 },
  { stars: 4, count: 12 },
  { stars: 3, count: 4 },
  { stars: 2, count: 1 },
  { stars: 1, count: 1 },
];

const RATING_LABELS: Record<number, string> = {
  5: "Loved it! Perfect flavor",
  4: "Really good, refreshing",
  3: "Average",
  2: "Not for me",
  1: "Disappointed",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className="flex items-center gap-1"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <HugeiconsIcon
          key={`star-${index}`}
          icon={StarIcon}
          aria-hidden="true"
          className={`size-4 ${
            index < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewSection({
  reviews = DEFAULT_REVIEWS,
  ratingBreakdown = DEFAULT_RATING_BREAKDOWN,
  onWriteReview,
}: ReviewSectionProps) {
  const [reviewList, setReviewList] = useState<Review[]>(reviews);
  const [breakdownList, setBreakdownList] = useState<RatingBreakdownItem[]>(ratingBreakdown);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields
  const [formRating, setFormRating] = useState(5);
  const [formHoverRating, setFormHoverRating] = useState(0);
  const [formEmail, setFormEmail] = useState("");
  const [formComment, setFormComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalReviews = breakdownList.reduce(
    (total, item) => total + item.count,
    0
  );

  const averageRating =
    totalReviews > 0
      ? breakdownList.reduce(
          (total, item) => total + item.stars * item.count,
          0
        ) / totalReviews
      : 0;

  const visibleReviews = reviewList.slice(0, visibleCount);

  const handleOpenModal = () => {
    if (onWriteReview) {
      onWriteReview();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleSubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formEmail.trim() || !formComment.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    const emailUsername = formEmail.split("@")[0].replace(/[._-]+/g, " ").trim();
    const displayName = emailUsername
      ? emailUsername
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
      : "Verified Customer";

    const nameParts = displayName.split(/\s+/);
    const initials =
      nameParts.length > 1
        ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
        : displayName.slice(0, 2).toUpperCase();

    const newReview: Review = {
      id: Date.now(),
      name: displayName,
      initials,
      rating: formRating,
      comment: formComment.trim(),
      date: new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
      verified: true,
    };

    setReviewList((prev) => [newReview, ...prev]);

    // Update breakdown count
    setBreakdownList((prev) =>
      prev.map((item) =>
        item.stars === formRating ? { ...item, count: item.count + 1 } : item
      )
    );

    // Reset form state
    setFormEmail("");
    setFormComment("");
    setFormRating(5);
    setFormHoverRating(0);
    setIsSubmitting(false);
    setIsModalOpen(false);

    toast.success("Thank you! Your review has been submitted.");
  };

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
    >
      {/* Section heading */}
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
          Real customer love
        </p>

        <h2
          id="reviews-heading"
          className="mt-3 text-3xl font-bold tracking-tight text-blue-950 dark:text-white sm:text-4xl"
        >
          What People Are Saying
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
          Discover why customers are making fruit-infused water part of their
          everyday routine.
        </p>
      </div>

      {/* Rating summary */}
      <Card className="mb-10 border border-gray-200 dark:border-gray-800 dark:bg-card ring-0 py-0 shadow-sm">
        <CardContent className="grid gap-8 p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8">
          {/* Overall score */}
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Rating</p>

            <p className="mt-2 text-5xl font-extrabold text-blue-950 dark:text-white">
              {averageRating > 0 ? averageRating.toFixed(1) : "0.0"}
            </p>

            <div className="mt-3">
              <StarRating rating={Math.round(averageRating)} />
            </div>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
            </p>
          </div>

          <Separator className="md:hidden" />

          {/* Rating distribution */}
          <div className="flex flex-col justify-center gap-3">
            {breakdownList.map((item) => {
              const percentage =
                totalReviews > 0
                  ? Math.round((item.count / totalReviews) * 100)
                  : 0;

              return (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="w-12 shrink-0 text-sm text-gray-600 dark:text-gray-300">
                    {item.stars} star
                  </span>

                  <Progress
                    value={percentage}
                    aria-label={`${item.stars} star reviews: ${item.count} (${percentage}%)`}
                    className="h-2 flex-1"
                  />

                  <span className="w-7 text-right text-sm text-gray-500 dark:text-gray-400">
                    {item.count}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Reviews heading and action */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-blue-950 dark:text-white">Customer Reviews</h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {reviewList.length > 0
              ? `Showing ${visibleReviews.length} of ${reviewList.length} reviews`
              : "No reviews yet"}
          </p>
        </div>

        <Button
          className="rounded-full bg-blue-950 dark:bg-blue-600 text-white hover:bg-blue-900 dark:hover:bg-blue-500 transition-colors cursor-pointer"
          onClick={handleOpenModal}
        >
          <HugeiconsIcon icon={PenLineIcon} className="mr-2 size-4" />
          Write a Review
        </Button>
      </div>

      {/* Review cards */}
      {visibleReviews.length === 0 ? (
        <Card className="border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40 p-12 text-center">
          <p className="text-base font-semibold text-gray-700 dark:text-gray-300">No reviews yet</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Be the first to share your thoughts on this flavor!
          </p>
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              className="rounded-full border-blue-950 dark:border-blue-500 text-blue-950 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer"
              onClick={handleOpenModal}
            >
              <HugeiconsIcon icon={PenLineIcon} className="mr-2 size-4" />
              Write the First Review
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visibleReviews.map((review) => (
            <Card
              key={review.id}
              className="border border-gray-200 dark:border-gray-800 dark:bg-card ring-0 py-0 shadow-sm transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-md"
            >
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-11">
                      <AvatarFallback className="bg-blue-100 dark:bg-blue-950 font-semibold text-blue-950 dark:text-blue-200">
                        {review.initials}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-semibold text-blue-950 dark:text-white">
                        {review.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {review.date}
                      </p>
                    </div>
                  </div>

                  <StarRating rating={review.rating} />
                </div>

                {review.title && (
                  <h4 className="mt-5 font-semibold text-gray-900 dark:text-white">
                    {review.title}
                  </h4>
                )}

                <p className={`${review.title ? "mt-2" : "mt-5"} text-sm leading-6 text-gray-600 dark:text-gray-300`}>
                  {review.comment}
                </p>

                {review.verified && (
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    <HugeiconsIcon
                      icon={CheckmarkCircle02Icon}
                      className="size-4 shrink-0"
                    />
                    Verified customer
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Load more */}
      {visibleCount < reviewList.length && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            className="rounded-full border-blue-950 dark:border-blue-500 px-6 text-blue-950 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
            onClick={() =>
              setVisibleCount((current) =>
                Math.min(current + 4, reviewList.length)
              )
            }
          >
            Load More Reviews
            <HugeiconsIcon icon={ChevronDownIcon} className="ml-2 size-4" />
          </Button>
        </div>
      )}

      {/* Write a Review Shadcn Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-card p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-950 dark:text-white">
              Write a Review
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 dark:text-gray-300">
              Share your experience with Peach Raspberry Hint® Water with other shoppers.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitReview} className="space-y-5 mt-2">
            {/* Interactive Star Rating */}
            <div className="flex flex-col items-center justify-center space-y-2 py-1">
              <Label className="text-sm font-semibold text-gray-800 dark:text-gray-200 w-full text-left">
                Overall Rating <span className="text-rose-500">*</span>
              </Label>
              <div
                role="radiogroup"
                aria-label="Rating from 1 to 5 stars"
                className="flex items-center justify-center gap-1.5"
              >
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const activeRating = formHoverRating || formRating;
                  const isFilled = starValue <= activeRating;

                  return (
                    <Button
                      variant="ghost"
                      size="icon"
                      key={starValue}
                      type="button"
                      role="radio"
                      aria-checked={formRating === starValue}
                      aria-label={`${starValue} star`}
                      className="bg-transparent hover:bg-transparent p-1 text-gray-300 transition-transform hover:scale-115 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer border-0 shadow-none"
                      onClick={() => setFormRating(starValue)}
                      onMouseEnter={() => setFormHoverRating(starValue)}
                      onMouseLeave={() => setFormHoverRating(0)}
                    >
                      <HugeiconsIcon
                        icon={StarIcon}
                        className={`size-8 transition-colors ${
                          isFilled
                            ? "fill-amber-400 text-amber-400"
                            : "fill-transparent text-gray-300"
                        }`}
                      />
                    </Button>
                  );
                })}
              </div>
              <span className="text-xs font-medium text-gray-600 text-center min-h-[1.25rem]">
                {RATING_LABELS[formHoverRating || formRating]}
              </span>
            </div>

            {/* Review Comment */}
            <div className="space-y-1.5">
              <Label htmlFor="review-comment" className="text-sm font-semibold text-gray-800">
                Review Details <span className="text-rose-500">*</span>
              </Label>
              <Textarea
                id="review-comment"
                required
                rows={4}
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                placeholder="Tell us what you liked about the peach-raspberry taste, crispness, and how it fits into your daily routine..."
                className="border-gray-300 focus-visible:border-blue-900 focus-visible:ring-blue-950/20 min-h-28 resize-y"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <Label htmlFor="reviewer-email" className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Email Address <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="reviewer-email"
                type="email"
                required
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="e.g., emily@example.com"
                className="border-gray-300 dark:border-gray-700 focus-visible:border-blue-900 focus-visible:ring-blue-950/20"
              />
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Will not be shown publicly.
              </p>
            </div>

            {/* Footer buttons */}
            <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-blue-950 dark:bg-blue-600 text-white hover:bg-blue-900 dark:hover:bg-blue-500 cursor-pointer"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export { ReviewSection as ReviewsSection };