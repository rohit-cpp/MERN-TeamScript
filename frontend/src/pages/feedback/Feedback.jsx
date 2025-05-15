import React, { useState } from "react";
import { toast } from "sonner";
import { useSubmitFeedbackMutation } from "@/store/api/feedbackApi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/Navbar";

const FeedbackForm = () => {
  const [submitFeedback] = useSubmitFeedbackMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    feedback: "",
    rating: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (rating) => {
    setForm({ ...form, rating });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitFeedback(form).unwrap();
      toast.success("Feedback submitted!");
      setForm({ name: "", email: "", feedback: "", rating: 0 });
    } catch (error) {
      toast.error(error?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14 mt-10">
        <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-center">
          Submit Feedback
        </h2>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <Label className="py-1">Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label className="py-1">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label className="py-1">Your Feedback</Label>
            <textarea
              name="feedback"
              placeholder="Your Feedback"
              className="w-full border p-2 rounded-sm resize-none h-32"
              value={form.feedback}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-center text-xl sm:text-2xl font-semibold">
            <label className="mr-2">Rating:</label>
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={`cursor-pointer ml-1 ${
                  num <= form.rating ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => handleRating(num)}
              >
                ★
              </span>
            ))}
          </div>
          <div className="text-center">
            <Button type="submit" className="w-full sm:w-60" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
