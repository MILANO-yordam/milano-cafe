"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Coffee, Edit, Home, LogOut, Menu, Plus, Trash2, FolderOpen, Package, ShoppingBag, Mail, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { adminNavigation } from "@/lib/admin-navigation"
import type { Category } from "@/lib/types"

interface CategoriesManagementProps {
    categories: Category[]
}

const emptyCategory = {
    name: "",
    slug: "",
    description: "",
    image_url: "",
}

export function CategoriesManagement({ categories: initialCategories }: CategoriesManagementProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [categories, setCategories] = useState(initialCategories)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [formData, setFormData] = useState(emptyCategory)
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [imagePreview, setImagePreview] = useState("")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        // Real-time categories subscription
        const supabase = createClient()

        const channel = supabase
            .channel(`categories-updates-${Date.now()}`, {
                config: { broadcast: { self: true } },
            })
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "categories",
                },
                (payload: any) => {
                    if (payload.eventType === "INSERT") {
                        setCategories((prev) => {
                            const exists = prev.some((c) => c.id === payload.new.id)
                            if (exists) return prev
                            return [payload.new as Category, ...prev]
                        })
                    } else if (payload.eventType === "UPDATE") {
                        setCategories((prev) =>
                            prev.map((category) => (category.id === payload.new.id ? (payload.new as Category) : category))
                        )
                    } else if (payload.eventType === "DELETE") {
                        setCategories((prev) => prev.filter((category) => category.id !== payload.old.id))
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    if (!mounted) return null

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push("/")
    }

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
    }

    const openCreateDialog = () => {
        setSelectedCategory(null)
        setFormData(emptyCategory)
        setImagePreview("")
        setDialogOpen(true)
    }

    const openEditDialog = (category: Category) => {
        setSelectedCategory(category)
        setFormData({
            name: category.name,
            slug: category.slug,
            description: category.description || "",
            image_url: category.image_url || "",
        })
        setImagePreview(category.image_url || "")
        setDialogOpen(true)
    }

    const handleImageUpload = async (file: File) => {
        try {
            const supabase = createClient()
            const fileName = `category-${Date.now()}-${Math.random().toString(36).substring(7)}`
            const fileExt = file.name.split(".").pop()

            // Try to upload to storage
            const { data, error } = await supabase.storage
                .from("categories")
                .upload(`images/${fileName}.${fileExt}`, file)
                .catch(() => ({ data: null, error: { message: "Storage not configured" } }))

            if (error && error.message !== "Storage not configured") {
                throw error
            }

            if (data) {
                const { data: urlData } = supabase.storage
                    .from("categories")
                    .getPublicUrl(`images/${fileName}.${fileExt}`)
                return urlData.publicUrl
            }

            // Fallback: Convert to base64 if storage not available
            return new Promise((resolve) => {
                const reader = new FileReader()
                reader.onload = (e) => {
                    resolve(e.target?.result as string)
                }
                reader.readAsDataURL(file)
            })
        } catch (error) {
            console.error("Image upload error:", error)
            toast({
                title: "Xatolik",
                description: "Rasmni yuklashda xatolik yuz berdi. URL orqali qo'shib ko'ring.",
                variant: "destructive",
            })
            return null
        }
    }

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Show preview
        const reader = new FileReader()
        reader.onload = (event) => {
            setImagePreview(event.target?.result as string)
        }
        reader.readAsDataURL(file)

        // Upload immediately
        const url = await handleImageUpload(file)
        if (url) {
            setFormData({ ...formData, image_url: url })
        }
    }

    const handleSave = async () => {
        if (!formData.name) {
            toast({
                title: "Xatolik",
                description: "Iltimos, kategoriya nomini kiriting",
                variant: "destructive",
            })
            return
        }

        setLoading(true)
        const supabase = createClient()

        try {
            const categoryData = {
                name: formData.name,
                slug: formData.slug || generateSlug(formData.name),
                description: formData.description || null,
                image_url: formData.image_url || null,
            }

            if (selectedCategory) {
                // Update existing
                const { error } = await supabase
                    .from("categories")
                    .update(categoryData)
                    .eq("id", selectedCategory.id)

                if (error) throw error

                setCategories((prev) =>
                    prev.map((c) => (c.id === selectedCategory.id ? { ...c, ...categoryData } : c))
                )

                toast({ title: "Muvaffaqiyatli", description: "Kategoriya yangilandi" })
            } else {
                // Create new
                const { data, error } = await supabase
                    .from("categories")
                    .insert(categoryData)
                    .select()
                    .single()

                if (error) throw error

                setCategories((prev) => [data, ...prev])
                toast({ title: "Muvaffaqiyatli", description: "Yangi kategoriya qo'shildi" })
            }

            setDialogOpen(false)
        } catch (error) {
            console.error("Save error:", error)
            toast({
                title: "Xatolik",
                description: "Ma'lumotni saqlashda xatolik yuz berdi",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!selectedCategory) return

        setLoading(true)
        const supabase = createClient()

        try {
            const { error } = await supabase.from("categories").delete().eq("id", selectedCategory.id)

            if (error) throw error

            setCategories((prev) => prev.filter((c) => c.id !== selectedCategory.id))
            toast({ title: "Muvaffaqiyatli", description: "Kategoriya o'chirildi" })
            setDeleteDialogOpen(false)
            setSelectedCategory(null)
        } catch (error) {
            console.error("Delete error:", error)
            toast({
                title: "Xatolik",
                description: "O'chirishda xatolik yuz berdi",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const Sidebar = () => (
        <div className="flex h-full flex-col bg-gradient-to-b from-slate-950 to-slate-900 border-r border-slate-800">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-600 to-amber-700">
                    <Coffee className="h-5 w-5 text-white" />
                </div>
                <div>
                    <div className="font-serif text-sm font-bold text-amber-400">MILANO</div>
                    <div className="text-xs text-amber-600 font-semibold tracking-wider">KAFE</div>
                </div>
            </div>

            <nav className="flex-1 space-y-2 px-4 py-6">
                {adminNavigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${item.href === "/admin/categories"
                                ? "bg-amber-500/10 text-amber-400 border-l-2 border-amber-400"
                                : "text-slate-300 hover:text-amber-300 hover:bg-slate-800/50"
                            }`}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="border-t border-slate-800 p-4 space-y-2">
                <Link href="/">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-slate-300 hover:text-amber-300 hover:bg-slate-800"
                    >
                        <Home className="h-5 w-5" />
                        Saytga qaytish
                    </Button>
                </Link>
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start gap-3 text-slate-300 hover:text-amber-300 hover:bg-slate-800"
                >
                    <LogOut className="h-5 w-5" />
                    Chiqish
                </Button>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-muted/30 dark:bg-slate-950">
            {/* Desktop Sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
                <Sidebar />
            </div>

            {/* Mobile Sidebar */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetContent side="left" className="w-64 p-0">
                    <SheetTitle className="sr-only">Admin Menu</SheetTitle>
                    <Sidebar />
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Mobile Header */}
                <div className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-card px-4 lg:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <span className="font-serif font-bold">Kategoriyalar</span>
                </div>

                <main className="p-4 lg:p-8">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">Kategoriyalar</h1>
                            <p className="text-muted-foreground">Barcha kategoriyalarni boshqaring</p>
                        </div>
                        <Button onClick={openCreateDialog} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Yangi kategoriya
                        </Button>
                    </div>

                    {/* Search */}
                    <div className="mb-6">
                        <Input
                            placeholder="Kategoriya qidirish..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="max-w-xs"
                        />
                    </div>

                    {/* Categories Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredCategories.length === 0 ? (
                            <div className="col-span-full py-16 text-center">
                                <FolderOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                                <p className="text-muted-foreground">Kategoriyalar topilmadi</p>
                            </div>
                        ) : (
                            filteredCategories.map((category) => (
                                <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-all">
                                    <div className="relative aspect-video bg-muted">
                                        {category.image_url ? (
                                            <Image
                                                src={category.image_url}
                                                alt={category.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full bg-slate-200 dark:bg-slate-700">
                                                <FolderOpen className="h-8 w-8 text-slate-400" />
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="mb-2">
                                            <h3 className="font-medium text-lg">{category.name}</h3>
                                            <p className="text-xs text-muted-foreground">{category.slug}</p>
                                            {category.description && (
                                                <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{category.description}</p>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 bg-transparent"
                                                onClick={() => openEditDialog(category)}
                                            >
                                                <Edit className="mr-1 h-3 w-3" />
                                                Tahrir
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                                                onClick={() => {
                                                    setSelectedCategory(category)
                                                    setDeleteDialogOpen(true)
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </main>
            </div>

            {/* Create/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{selectedCategory ? "Kategoriyani tahrirlash" : "Yangi kategoriya"}</DialogTitle>
                        <DialogDescription>
                            {selectedCategory ? "Kategoriya ma'lumotlarini o'zgartiring" : "Yangi kategoriya qo'shing"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nomi *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                        slug: generateSlug(e.target.value),
                                    })
                                }}
                                placeholder="Kategoriya nomi"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="kategoriya-nomi"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Tavsif</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Kategoriya haqida qisqacha..."
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Rasm</Label>
                            <div className="flex flex-col gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="image" className="text-sm text-muted-foreground">Fayl orqali yuklash</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        className="cursor-pointer"
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-muted"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">yoki</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image_url" className="text-sm text-muted-foreground">URL orqali qo'shish</Label>
                                    <Input
                                        id="image_url"
                                        type="url"
                                        value={formData.image_url}
                                        onChange={(e) => {
                                            setFormData({ ...formData, image_url: e.target.value })
                                            setImagePreview(e.target.value)
                                        }}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                {imagePreview && (
                                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border">
                                        <Image
                                            src={imagePreview}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                            onError={() => setImagePreview("")}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Bekor qilish
                        </Button>
                        <Button onClick={handleSave} disabled={loading}>
                            {loading ? "Saqlanmoqda..." : "Saqlash"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>O'chirishni tasdiqlang</DialogTitle>
                        <DialogDescription>
                            "{selectedCategory?.name}" kategoriyasini o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Bekor qilish
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                            {loading ? "O'chirilmoqda..." : "O'chirish"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
