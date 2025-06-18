
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Star, Gift, Zap, Trophy, Shirt, Medal } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  category: 'jerseys' | 'accessories' | 'lifestyle' | 'collectibles';
  price: number;
  xpDiscount: number;
  image: string;
  rating: number;
  reviews: number;
  featured: boolean;
  limited: boolean;
}

const MerchandiseStore = () => {
  const { user, addXP } = useAuth();
  const { toast } = useToast();
  const [cart, setCart] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const products: Product[] = [
    {
      id: '1',
      name: 'FC Barcelona Home Jersey 24/25',
      category: 'jerseys',
      price: 89.99,
      xpDiscount: 15,
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 1247,
      featured: true,
      limited: false
    },
    {
      id: '2',
      name: 'Limited Edition Clásico Scarf',
      category: 'accessories',
      price: 34.99,
      xpDiscount: 20,
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 856,
      featured: false,
      limited: true
    },
    {
      id: '3',
      name: 'Camp Nou Stadium Model',
      category: 'collectibles',
      price: 149.99,
      xpDiscount: 10,
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 423,
      featured: true,
      limited: false
    },
    {
      id: '4',
      name: 'Barça Training Jacket',
      category: 'lifestyle',
      price: 64.99,
      xpDiscount: 12,
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 789,
      featured: false,
      limited: false
    },
    {
      id: '5',
      name: 'Pedri #8 Away Jersey',
      category: 'jerseys',
      price: 94.99,
      xpDiscount: 18,
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 2156,
      featured: true,
      limited: false
    },
    {
      id: '6',
      name: 'Golden Badge Pin Set',
      category: 'accessories',
      price: 19.99,
      xpDiscount: 25,
      image: '/placeholder.svg',
      rating: 4.5,
      reviews: 345,
      featured: false,
      limited: true
    }
  ];

  const getXPRequirement = (discount: number) => Math.floor(discount * 100);

  const calculateDiscount = (price: number, xpDiscount: number) => {
    if (!user) return { discountedPrice: price, savings: 0, canAfford: false };
    
    const requiredXP = getXPRequirement(xpDiscount);
    const canAfford = user.xp >= requiredXP;
    const discountAmount = canAfford ? (price * xpDiscount) / 100 : 0;
    const discountedPrice = price - discountAmount;
    
    return { discountedPrice, savings: discountAmount, canAfford };
  };

  const addToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
    
    if (user) {
      addXP(10);
      toast({
        title: "🛒 Added to Cart",
        description: "Item added successfully! +10 XP earned",
      });
    }
  };

  const buyWithXP = (product: Product) => {
    const requiredXP = getXPRequirement(product.xpDiscount);
    
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to use XP discounts",
        variant: "destructive"
      });
      return;
    }
    
    if (user.xp < requiredXP) {
      toast({
        title: "Insufficient XP",
        description: `You need ${requiredXP} XP for this discount. You have ${user.xp} XP.`,
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would integrate with payment processing
    toast({
      title: "🎉 Purchase Successful!",
      description: `You saved €${calculateDiscount(product.price, product.xpDiscount).savings.toFixed(2)} with XP!`,
    });
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'jerseys': return <Shirt className="w-4 h-4" />;
      case 'accessories': return <Medal className="w-4 h-4" />;
      case 'lifestyle': return <Star className="w-4 h-4" />;
      case 'collectibles': return <Trophy className="w-4 h-4" />;
      default: return <ShoppingCart className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2">
          Official Barça Store
        </h1>
        <p className="text-gray-600 text-lg">Authentic merchandise with exclusive XP discounts</p>
        
        {user && (
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg">
            <div className="flex items-center justify-center gap-4">
              <Badge className="bg-yellow-500 text-black">
                <Zap className="w-4 h-4 mr-1" />
                {user.xp} XP Available
              </Badge>
              <span className="text-sm text-gray-600">
                Use XP to unlock exclusive discounts!
              </span>
            </div>
          </div>
        )}
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="featured" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Featured
          </TabsTrigger>
          <TabsTrigger value="limited" className="flex items-center gap-2">
            <Gift className="w-4 h-4" />
            Limited Edition
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          {/* Category Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Button 
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  All Products
                </Button>
                {['jerseys', 'accessories', 'lifestyle', 'collectibles'].map(category => (
                  <Button 
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    className="flex items-center gap-2 capitalize"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {getCategoryIcon(category)}
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const { discountedPrice, savings, canAfford } = calculateDiscount(product.price, product.xpDiscount);
              
              return (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {product.limited && (
                      <Badge className="absolute top-2 left-2 bg-red-600">Limited</Badge>
                    )}
                    {product.featured && (
                      <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">Featured</Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold">€{discountedPrice.toFixed(2)}</span>
                        {savings > 0 && (
                          <span className="text-sm line-through text-gray-500">€{product.price.toFixed(2)}</span>
                        )}
                      </div>
                      
                      {user && (
                        <div className="bg-yellow-50 p-2 rounded text-sm">
                          <div className="flex items-center justify-between">
                            <span>XP Discount: {product.xpDiscount}%</span>
                            <Badge variant={canAfford ? "default" : "outline"}>
                              {getXPRequirement(product.xpDiscount)} XP
                            </Badge>
                          </div>
                          {savings > 0 && (
                            <span className="text-green-600 font-semibold">
                              Save €{savings.toFixed(2)}!
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        className="w-full"
                        onClick={() => addToCart(product.id)}
                      >
                        Add to Cart
                      </Button>
                      
                      {user && canAfford && (
                        <Button 
                          variant="outline"
                          className="w-full bg-yellow-50 border-yellow-300 hover:bg-yellow-100"
                          onClick={() => buyWithXP(product)}
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Buy with XP Discount
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="featured">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.filter(p => p.featured).map((product) => (
              <Card key={product.id} className="border-2 border-yellow-300">
                {/* Same product card structure as above */}
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">Featured</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="text-2xl font-bold mb-4">€{product.price.toFixed(2)}</div>
                  <Button className="w-full" onClick={() => addToCart(product.id)}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="limited">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.filter(p => p.limited).map((product) => (
              <Card key={product.id} className="border-2 border-red-300">
                {/* Same product card structure as above */}
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 left-2 bg-red-600">Limited</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="text-2xl font-bold mb-4">€{product.price.toFixed(2)}</div>
                  <Button className="w-full" onClick={() => addToCart(product.id)}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6">
          <Button className="rounded-full w-16 h-16 bg-blue-600 hover:bg-blue-700">
            <ShoppingCart className="w-6 h-6" />
            <Badge className="absolute -top-2 -right-2 bg-red-500">{cart.length}</Badge>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MerchandiseStore;
